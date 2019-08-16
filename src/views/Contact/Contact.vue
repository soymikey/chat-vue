<template>
  <div class="contact_container">
    <x-header :left-options="{showBack: false}">通讯录</x-header>

    <scroller
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>
        <cell title="新的朋友" v-for="item in list" :key="{item}">
          <img
            slot="icon"
            width="35"
            style="display:block;margin-right:15px; "
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
          />
        </cell>
        <load-more :show-loading="false" tip="我也是有底线的"></load-more>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollBoxHeight: '',
      list: 20

    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight = document.documentElement.clientHeight - 46 - 46 + 'px'
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style lang="scss">
</style>
