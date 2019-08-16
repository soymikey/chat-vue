<template>
  <div>
    <x-header
      :left-options="{showBack: false}"
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true"
    >微信</x-header>
    <!--
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="static"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
    ></search>-->

    <search position="absolute" auto-scroll-to-top top="46px" ref="search"></search>
    <scroller
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>
        <panel :list="list" :type="type"></panel>
        <load-more tip="正在加载"></load-more>
      </div>
    </scroller>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="goToPage"></actionsheet>
    </div>
  </div>
</template>

<script>
import { TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  data () {
    return {
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
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc:
            '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/conversation'
        },
        {
          src: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
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
      document.documentElement.clientHeight - 46 - 44 - 46 - 23.23 + 'px'
  },
  computed: {},
  watch: {},
  methods: {
    onScrollBottom () {
      console.log('onScrollBottom')
    },
    goToPage (value) {
      if (value === 'addFriend') {
        this.$router.push('/addfriend')
      }
    }
  }
}
</script>
