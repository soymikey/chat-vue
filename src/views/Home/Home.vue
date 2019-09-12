<template>
  <div>

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

          <panel>

            <div slot="body" class="panel_container">
              <div class="avartar_container">
                <img width="100%" :src="IMG_URL+item.photo" />
                <badge v-if="item.unRead !== 0 &&Object.keys(item).indexOf('unRead')!==-1" class="badge" :text="item.unRead" :max="99"></badge>
              </div>
              <div class="body">
                <div class="title">{{item.name}}</div>
                <div class="content">{{item.lastMes}}</div>
              </div>
            </div>
          </panel>
        </div>
        <!-- <load-more tip="loading"></load-more> -->
      </div>
    </scroller>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="goToPage"></actionsheet>
    </div>
  </div>
</template>

<script>
import { TransferDom } from 'vux'
import { mapState } from 'vuex'
import api from '@/api'
import env from '../../../config/env'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      IMG_URL: env.imgUrl,
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
      contactsList: [], // 会话列表
      IMGURL: process.env.IMG_URL,
      settingFlag: {
        // 设置面板
        f: false
      },
      removeSation: {}
    }
  },

  created () {},
  mounted () {
    this.scrollBoxHeight =
      document.documentElement.clientHeight - 46 - 44 - 54 + 'px'
  },

  computed: {
    ...mapState(['user', 'conversationsList', 'currSation', 'Vchat', 'unRead'])

  },
  watch: {
    conversationsList: {
      handler (list) {
        this.contactsList = list

        this.contactsList = JSON.parse(JSON.stringify(list))
        if (!this.currSation.id && list.length) {
          this.$store.commit('setCurrSation', this.contactsList[0])
        }
        if (!list.length) {
          this.$store.commit('setCurrSation', {})
        }
        if (!isNaN(this.removeSation.index)) {
          if (
            this.currSation.id === this.removeSation.item.id &&
            this.contactsList.length !== 0
          ) {
            let result =
              this.contactsList[this.removeSation.index] ||
              this.contactsList[this.removeSation.index - 1] ||
              this.contactsList[this.removeSation.index + 1]

            this.$store.commit('setCurrSation', result)
          }
        }
      },
      deep: true,
      immediate: true
    },

    contactsList: {
      handler (list) {
        if (!list.length) {
          this.$store.commit('setCurrSation', {})
        }
      },
      deep: true
    },
    unRead: {
      handler (list) {
        this.contactsList.forEach((v, i) => {
          list.forEach(m => {
            if (v.id === m.roomid) {
              this.$set(
                this.contactsList,
                i,
                Object.assign({}, v, { unRead: m.count, lastMes: m.lastMes.mes })
              )
            }
          })
        })
      },
      deep: true,
      immediate: true
    }

  },
  methods: {

    onScrollBottom () {},
    refresh () {
      console.log('refresh')
    },
    goToPage (value) {
      if (value === 'addFriend') {
        this.$router.push('/addfriend')
      }
    },
    goToConversation (value) {
      this.$store.commit('setCurrSation', value)

      this.$router.push({ path: `/conversation/${value.id}` })
    },
    // --------------------------------------
    setCurrSation (v) {
      if (v.id === this.currSation.id) {
        return
      }
      this.currSation = v
    },

    remove (v, i) {
      if (v.type === 'vchat') {
        // 只做显示列表移除
        this.contactsList = this.contactsList.filter(m => m.id !== v.id)
        if (this.currSation.id === v.id && this.contactsList.length !== 0) {
          this.currSation =
            this.contactsList[i] ||
            this.contactsList[i - 1] ||
            this.contactsList[i + 1]
        }
      } else {
        api.removeConversitionList(v).then(r => {
          if (r.code === 0) {
            this.$message({
              type: 'success',
              message: '移除成功'
            })
            this.$store.commit(
              'setConversationsList',
              Object.assign({ d: true }, v)
            )
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
    },
    getNewMes (m) {
      // 获取最新一条消息
      this.contactsList.forEach((v, i) => {
        if (v.id === m.roomid) {
          this.$set(
            this.contactsList,
            i,
            Object.assign({}, v, {
              newMes: m.mes,
              newMesTime: m.time.split(' ')[1]
            })
          )
        }
      })
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
    width: 60%;
    .title {
      font-weight: 400;
      font-size: 17px;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {

      color: #999999;
      font-size: 17px;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // width: 70%;
      // color: #999999;
      // font-size: 13px;
      // line-height: 1.2;
      //   width: auto;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      // word-wrap: break-word;
      // word-break: break-all;
    }
  }
}
</style>
