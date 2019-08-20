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
        <div v-for="(item,index) in list" :key="index" @click="goToConversation(item)">
          <panel >
            <div slot="body" class="panel_container">
              <div class="avartar_container">
                <img width="100%" :src="item.src" />
                <badge class="badge" text="3"></badge>
              </div>
              <div class="body">
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.desc}}</div>
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
import { mapState } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  data () {
    return {
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
      list: [
        {
          src: require('../../assets/me.jpg'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: require('../../assets/other.jpg'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: require('../../assets/other.jpg'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: require('../../assets/other.jpg'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: require('../../assets/other.jpg'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: require('../../assets/other.jpg'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: require('../../assets/other.jpg'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        }
      ]
    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight =
      document.documentElement.clientHeight - 46 - 44 - 54 + 'px'
  },
  computed: {
    ...mapState(['conversationsList']),
    addOrDel () {
      return this.conversationsList.filter(v => v.id === this.currGroup._id).length
    }
  },
  watch: {},
  methods: {
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.list = this.list.concat([
            {
              src: require('../../assets/other.jpg'),
              fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
              title: '标题一',
              desc:
                '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
              url: '/conversation'
            },
            {
              src: require('../../assets/other.jpg'),
              fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
              title: '标题一',
              desc:
                '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
              url: '/conversation'
            }
          ])
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
      }
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
      this.$router.push('/conversation')
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
