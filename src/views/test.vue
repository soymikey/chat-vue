 // "scripts": {
  //   "serve": "vue-cli-service serve",
  //   "build": "vue-cli-service build",
  //   "lint": "vue-cli-service lint"
  // },

  import VueSocketio from 'vue-socket.io'
import Socketio from 'socket.io-client'
import { XButton, Tabbar, TabbarItem, Group, Cell, XHeader, Search, Scroller, Card, Confirm, Panel, XImg, LoadMore, XInput, Actionsheet, XTextarea, Badge, ButtonTab, ButtonTabItem, Toast, ToastPlugin } from 'vux'

// Vue.use(new VueSocketio, socketio(process.env.SOCKETIO))
// Vue.use(VueSocketio, 'http://localhost:8899')
Vue.use(new VueSocketio({
  debug: true,
  connection: Socketio('http://localhost:8080', {}), // options object is Optional
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
})
)
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
  <div v-for="item in messageList" :key="item" class="coversation_box-container">
 <!-- <div class="other_avatar_container"></div> -->
          <img class="other_avatar" width="35" height="35" :src="item.sender==='michael'?me:other"  />
          <div :class="item.sender==='michael'?'other_message_box':'my_message_box'">
            {{item.message}}
            <span :class="item.sender==='michael'?'other_spike':'my_spike'"></span>
          </div>
          <img class="my_avartar"  width="35" height="35" :src="item.sender==='michael'?me:other" />
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
