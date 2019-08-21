<template>
  <div class="contact_container">
    <x-header :left-options="{showBack: false}">通讯录</x-header>

    <scroller
      class="scroll"
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>

        <group>
          <cell is-link :title="item.name+index" v-for="(item,index) in list" :key="index">
            <img slot="icon" width="35" style="display:block;margin-right:15px; " :src="item.icon" />
          </cell>
          <load-more :show-loading="false" tip="我也是有底线的"></load-more>
        </group>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollBoxHeight: '',

      other: require('../../assets/me.jpg'),
      list: [
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/emoji.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/emoji.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/emoji.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/emoji.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/emoji.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/emoji.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/emoji.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/collection.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/album.png') },
        { name: '新的朋友', icon: require('../../assets/userpng/card_bag.png') } ]

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
      // console.log('onScrollBottom')
    }
  }
}
</script>
<style lang="scss">
.scroll {
  background-color: #f7f7fa;
}
</style>
