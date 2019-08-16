<template>
  <div class="explore_container">
    <x-header >添加朋友</x-header>
    <search

      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"

      ref="search"></search>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {
    console.log('this.$route.query', this.$route)
  },
  computed: {

  },
  watch: {},
  methods: {}
}
</script>
<style lang="scss">
</style>
