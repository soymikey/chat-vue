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
          v-if="item.sender!=="michael""
          slot="icon"
          width="35"
          style="display:block;margin-right:15px; "
          :src="other"
        />
        <img v-else slot="value" width="35" style="display:block;margin-right:15px; " :src="me" />
      </cell>
    </div>
  </div>
</template>
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
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  .view_container {
    background-color: #fff;
    flex: 1;
  }
  .carousel_container {
    height: 50px;
    background-color: red;

    height: 110px;
    overflow-y: scroll;
    ul {
      padding-left: 0;
      white-space: nowrap;
      overflow-x: visible;
      // overflow-y: hidden;
    }

    li {
      font-size: 20px;
      display: inline-block;
      list-style: none;
      padding: 2px;
      border: 1px solid cyan;
      border-radius: 2px;
      margin: 2px;
      position: relative;
    }
  }
}
</style>

<scroller lock-x :height="scrollBoxHeight" ref="scrollerBottom" :scroll-bottom-offst="250">
      <div>
        <div v-for="(item,index) in chatList" :key="index" class="coversation_box-container">

          <div
            v-if="item.type==='mine'"
            style="width:100%;
            display:flex;
            justify-content:flex-end;
            align-items:center;"
          >
            <div
              style="background-color: #5fc9f8;
            padding: 10px;
    border-radius: 3%;
    word-break: break-all;
     margin-right:10px;
     max-width:60%;
     position:relative
     "
            >{{item.mes}} <spans style='background: #5fc9f8;
    height: 8px;
    width: 8px;
    position: absolute;
right:-5px;
top:4px;
    transform: translate(-50%, -50%);
    transform: rotate(45deg);'></spans> </div>
            <img width="35" height="35" :src="IMG_URL+item.avatar" />
          </div>
          <div
            v-else
            style="width:100%;display:flex;justify-content:flex;align-items:center;"
          >
            <img width="35" height="35" :src="IMG_URL+item.avatar" />
            <div
              style="background-color: pink;
            padding: 10px;
    border-radius: 3%;
    word-break: break-all;
     margin-left:10px;
     max-width:60%;
     position:relative
     "
            >{{item.mes}} <spans style='background: pink;
    height: 8px;
    width: 8px;
    position: absolute;
left:-5px;
top:4px;
    transform: translate(-50%, -50%);
    transform: rotate(45deg);'></spans></div>
          </div>
        </div>
        <div style="height:30px"></div>
      </div>
    </scroller>
