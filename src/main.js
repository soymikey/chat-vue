import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'normalize.css'
import 'vux/src/styles/reset.less'
import VueSocketio from 'vue-socket.io'
import Socketio from 'socket.io-client'
import { XButton, Tabbar, TabbarItem, Group, Cell, XHeader, Search, Scroller, Card, Panel, XImg, LoadMore, XInput, Actionsheet, Badge, ButtonTab, ButtonTabItem, Toast, ToastPlugin } from 'vux'

// Vue.use(new VueSocketio, socketio(process.env.SOCKETIO))
// Vue.use(VueSocketio, 'http://localhost:8899')
Vue.use(new VueSocketio({
  debug: true,
  connection: Socketio('http://localhost:8899', {}), // options object is Optional
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
})
)
Vue.component('x-button', XButton)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-header', XHeader)
Vue.component('search', Search)
Vue.component('scroller', Scroller)
Vue.component('card', Card)
Vue.component('panel', Panel)
Vue.component('x-img', XImg)
Vue.component('load-more', LoadMore)
Vue.component('actionsheet', Actionsheet)
Vue.component('x-input', XInput)
Vue.component('badge', Badge)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('toast', Toast)
Vue.use(ToastPlugin)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
