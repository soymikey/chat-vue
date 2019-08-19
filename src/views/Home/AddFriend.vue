<template>
  <div class="explore_container">
    <x-header >添加朋友</x-header>
    <search

      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"

      ref="search"></search>
       <scroller
      class="scroll"
      lock-x
      :height="scrollBoxHeight"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
    <div>
        <div v-for="(item,index) in list" :key="index">
          <panel>
            <div slot="body" class="panel_container">
              <div class="avartar_container">
                <img width="100%" :src="item.src" />

              </div>
              <div class="body">
                <div class="title">{{item.title}}</div>
              </div>
            </div>
          </panel>
        </div>
        <!-- <load-more tip="loading"></load-more> -->
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          src: require('../../assets/me.jpg'),
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
      document.documentElement.clientHeight - 46 + 'px'
  },

  computed: {

  },
  watch: {},
  methods: {}
}
</script>
<style lang="scss">
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
