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
<div v-for="(item,index) in getRequestList" :key="index" @click="goToFRiendVerify(item)" >
          <panel >
            <div slot="body" class="panel_container">
              <div class="avartar_container">
                <img width="100%" :src="IMG_URL+item.avatar" />
                <badge class="badge"  ></badge>
              </div>
              <div class="body">
                <div class="title">{{item.name}}</div>
                <div class="content">{{item.mes}}</div>
              </div>
            </div>
          </panel>
        </div>
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
import { mapGetters } from 'vuex'
import { imgUrl } from '../../../config/env'

export default {
  data () {
    return {
      IMG_URL: imgUrl,

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
  computed: {
    ...mapGetters(['getRequestList'])

  },
  watch: {},
  methods: {
    onScrollBottom () {
      // console.log('onScrollBottom')
    },
    goToFRiendVerify (value) {
      this.$router.push({ name: 'friendverify', params: value })
    }
  }
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
