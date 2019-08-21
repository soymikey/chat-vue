<template>
  <div class="explore_container">
    <x-header>
      <span slot="overwrite-left"></span> 发现
    </x-header>
     <scroller
     class="scroll"
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"

    >
    <div >
      <group v-for="(list,index) in listData" :key='index'>
        <cell is-link :title="item.name" v-for="(item,i) in list" :key="i">
          <img
            slot="icon"
            width="35"
            style="display:block;margin-right:15px; "
            :src="item.icon"
          />
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
      listData: {
        list: [
          { name: '朋友圈', icon: require('../../assets/explorepng/moment.png') }

        ],
        list2: [ { name: '扫一扫', icon: require('../../assets/explorepng/scan.png') },
          { name: '摇一摇', icon: require('../../assets/explorepng/shake.png') } ],
        list3: [ { name: '看一看', icon: require('../../assets/explorepng/look.png') },
          { name: '搜一搜', icon: require('../../assets/explorepng/search.png') } ],
        list4: [ { name: '附近的人', icon: require('../../assets/explorepng/nearby.png') } ],
        list5: [ { name: '购物', icon: require('../../assets/explorepng/shopping.png') },
          { name: '游戏', icon: require('../../assets/explorepng/game.png') } ],
        list6: [{ name: '小程序', icon: require('../../assets/explorepng/mini_program.png') }]

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
      // console.log('onScrollBottom')
    }
  }
}
</script>
<style lang="scss">
.scroll{
  background-color: #F7F7FA;
}
</style>
