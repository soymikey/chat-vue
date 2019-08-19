<template>
  <div class="explore_container">
    <x-header>
      <span slot="overwrite-left"></span> 我的
    </x-header>
    <scroller
      class="scroll"
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>
         <panel :list="personalList" type='1'></panel>
        <group v-for="(list,index) in listData" :key="index">
          <cell is-link :title="item.name" v-for="(item,i) in list" :key="i">
            <img slot="icon" width="35" style="display:block;margin-right:15px; " :src="item.icon" />
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      personalList: [
        {
          src: require('../../assets/avartar.png'),
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '米高',
          desc:
            '微信号：soymikey',
          url: '/conversation'
        }],
      listData: {
        list: [
          { name: '支付', icon: require('../../assets/userpng/pay.png') }

        ],
        list2: [
          { name: '收藏', icon: require('../../assets/userpng/collection.png') },
          { name: '相册', icon: require('../../assets/userpng/album.png') },
          { name: '卡包', icon: require('../../assets/userpng/card_bag.png') },
          { name: '表情', icon: require('../../assets/userpng/emoji.png') }

        ],
        list3: [ { name: '设置', icon: require('../../assets/userpng/setting.png') }
        ]

      },
      scrollBoxHeight: ''

    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight = document.documentElement.clientHeight - 46 - 54 + 'px'
  },
  computed: {},
  watch: {},
  methods: {
    onScrollBottom () {
      console.log('onScrollBottom')
    }
  }
}
</script>
<style lang="scss">
.scroll {
  background-color: #f7f7fa;
}
</style>
