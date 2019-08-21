<template>
  <div class="explore_container">
    <x-header>
      <span slot="overwrite-left"></span> 登陆
    </x-header>
    <scroller
      class="scroll"
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    ></scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollBoxHeight: ''
    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight =
      document.documentElement.clientHeight - 46 + 'px'
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
