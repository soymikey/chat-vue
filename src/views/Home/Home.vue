<template>
  <div>
    <!-- {{conversationsList}} -->
    <x-header
      :left-options="{showBack: false}"
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >微信</x-header>
    <search position="absolute" auto-scroll-to-top top="46px" ref="search"></search>
    <scroller
      class="scroll"
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
      @on-pulldown-loading="refresh"
    >
      <div>
        <div v-for="(item,index) in contactsList" :key="index" @click="goToConversation(item)">
          <panel >
            <div slot="body" class="panel_container">
              <div class="avartar_container">
                <img width="100%" :src="IMG_URL+item.photo" />
                <badge :v-if="item.unRead !== 0" class="badge" :text='item.unRead' :max="99" ></badge>
              </div>
              <div class="body">
                <div class="title">{{item.name}}</div>
                <div class="content">{{item.newMes}}</div>
              </div>
            </div>
          </panel>
        </div>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="goToPage"></actionsheet>
    </div>
  </div>
</template>

<script>
import { TransferDom } from 'vux'
import { mapState, mapGetters } from 'vuex'
import api from '@/api'
import { imgUrl } from '../../../config/env'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      IMG_URL: imgUrl,
      onFetching: false,
      scrollBoxHeight: '',
      showMenus: false,
      menus: {
        groupChat: '发起群聊',
        addFriend: '添加朋友',
        scan: '扫一扫',
        PayAndRecieve: '收付款'
      },
      bottomCount: 20,
      type: '5',
      // ------------------
      currSation: {}, // 当前会话
      contactsList: [], // 会话列表
      // IMGURL: process.env.IMG_URL,
      settingFlag: { // 设置面板
        f: false
      },
      removeSation: {}
      // list: [
      //   {
      //     src: require('../../assets/me.jpg'),
      //     fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
      //     title: '标题一',
      //     desc:
      //       '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      //     url: '/conversation'
      //   },
      // ]
    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight =
      document.documentElement.clientHeight - 46 - 44 - 54 + 'px'
  },
  // computed: {
  //   ...mapState(['conversationsList']),
  //   addOrDel () {
  //     return this.conversationsList.filter(v => v.id === this.currGroup._id).length
  //   }
  // },
  computed: {
    ...mapState(['user', 'conversationsList', 'Vchat', 'unRead'])

  },
  watch: {
    conversationsList: {

      handler (list) {
        this.contactsList = JSON.parse(JSON.stringify(list))
        console.log('contactsList', this.contactsList)

        if (!this.currSation.id && list.length) {
          this.currSation = this.contactsList[0]
        }
        if (!list.length) {
          this.currSation = {}
        }
        if (!isNaN(this.removeSation.index)) {
          if (this.currSation.id === this.removeSation.item.id && this.contactsList.length !== 0) {
            this.currSation = this.contactsList[this.removeSation.index] || this.contactsList[this.removeSation.index - 1] || this.contactsList[this.removeSation.index + 1]
          }
        }
      },
      deep: true,
      immediate: true
    },
    contactsList: {
      handler (list) {
        if (!list.length) {
          this.currSation = {}
        }
      },
      deep: true
    },
    unRead: {
      handler (list) {
        this.contactsList.forEach((v, i) => {
          list.forEach(m => {
            if (v.id === m.roomid) {
              this.$set(this.contactsList, i, Object.assign({}, v, { unRead: m.count }))
            }
          })
        })
      },
      deep: true,
      immediate: true
    }
    // getNewMes: {
    //   handler (newMes) {
    //     console.log('newMes', newMes)

    //     this.contactsList.forEach((v, i) => {
    //       if (v.id === newMes.roomid) {
    //         this.$set(this.contactsList, i, Object.assign({}, v, { newMes: newMes.mes, newMesTime: newMes.time.split(' ')[1] }))
    //       }
    //     })
    //   },
    //   deep: true,
    //   immediate: true

    // }
  },
  methods: {
    onScrollBottom () {
      // if (this.onFetching) {
      //   // do nothing
      // } else {
      //   this.onFetching = true
      //   setTimeout(() => {
      //     this.list = this.list.concat([
      //       {
      //         src: require('../../assets/other.jpg'),
      //         fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
      //         title: '标题一',
      //         desc:
      //           '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      //         url: '/conversation'
      //       },
      //       {
      //         src: require('../../assets/other.jpg'),
      //         fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
      //         title: '标题一',
      //         desc:
      //           '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      //         url: '/conversation'
      //       }
      //     ])
      //     this.$nextTick(() => {
      //       this.$refs.scrollerBottom.reset()
      //     })
      //     this.onFetching = false
      //   }, 2000)
      // }
    },
    refresh () {
      console.log('refresh')
    },
    goToPage (value) {
      if (value === 'addFriend') {
        this.$router.push('/addfriend')
      }
    },
    goToConversation (value) {
      this.$router.push({ name: 'conversation', params: value })
    },
    // --------------------------------------
    setCurrSation (v) {
      if (v.id === this.currSation.id) {
        return
      }
      this.currSation = v
    },
    // getNewMes (m) { // 获取最新一条消息
    //   this.contactsList.forEach((v, i) => {
    //     if (v.id === m.roomid) {
    //       this.$set(this.contactsList, i, Object.assign({}, v, { newMes: m.mes, newMesTime: m.time.split(' ')[1] }))
    //     }
    //   })
    // },
    remove (v, i) {
      if (v.type === 'vchat') { // 只做显示列表移除
        this.contactsList = this.contactsList.filter(m => m.id !== v.id)
        if (this.currSation.id === v.id && this.contactsList.length !== 0) {
          this.currSation = this.contactsList[i] || this.contactsList[i - 1] || this.contactsList[i + 1]
        }
      } else {
        api.removeConversitionList(v).then(r => {
          if (r.code === 0) {
            this.$message({
              type: 'success',
              message: '移除成功'
            })
            this.$store.commit('setConversationsList', Object.assign({ d: true }, v))
            //                            this.contactsList = this.contactsList.filter(m => m.id !== v.id);
            this.removeSation = {
              item: v,
              index: i
            }
          } else {
            this.$message({
              type: 'success',
              message: '移除失败'
            })
          }
        })
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.scroll {
  background-color: #f7f7fa;

}
.panel_container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  position: relative;
  .avartar_container {
    width: 15%;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  .badge {
    position: absolute;
    top: 5px;
    left: 15%;
  }
  .body {
    padding: 10px;
    width: 85%;
    .title {
      font-weight: 400;
      font-size: 17px;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
    .content {
      color: #999999;
      font-size: 13px;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
