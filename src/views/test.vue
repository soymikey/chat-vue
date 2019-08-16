<template>
<div class="test_container">

  <div>
        <cell :title="item.message" v-for="item in messageList" :key="{item}">

          <img
          v-if='item.sender!=="michael"'
            slot="icon"
            width="35"
            style="display:block;margin-right:15px; "
            :src='other'
          />
          <img
        v-else
            slot="value"
            width="35"
            style="display:block;margin-right:15px; "
            :src='me'
          />
        </cell>
      </div>
</div></template>
 <div>
        <cell v-for="item in messageList" :key="item">
          <span slot="title" style="color:green;">
            <div class="my_message_box">
              {{item.message}}
              <span class="my_spike"></span>
            </div>
          </span>
          <img
            class="my_avartar"
            slot="icon"
            width="35"
            style="display:block;margin-right:5px;"
            :src="other"
          />
        </cell>
      </div>
<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style lang="scss">
</style>
