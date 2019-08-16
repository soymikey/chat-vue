
<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <tabbar v-show='isMainNav'>
      <tabbar-item link="/home">
        <i slot="icon" class="iconfont icon-message"></i>
        <span slot="label">微信</span>
      </tabbar-item>
      <tabbar-item show-dot link="/contact">
        <i slot="icon" class="iconfont icon-contact"></i>
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item link="/explore">
        <i slot="icon" class="iconfont icon-explore"></i>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/user">
        <i slot="icon" class="iconfont icon-user"></i>
        <span slot="label">我</span>
      </tabbar-item>

    </tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    isMainNav () {
      return ['home', 'contact', 'explore', 'user'].indexOf(this.$route.name) !== -1
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
