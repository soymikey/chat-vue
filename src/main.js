import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { socketIo } from '../config/env'
// import 'normalize.css'
import 'vux/src/styles/reset.less'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import { XButton, Tabbar, TabbarItem, Group, Cell, XHeader, Search, Scroller, Card, Confirm, Panel, XImg, LoadMore, XInput, Actionsheet, XTextarea, Badge, ButtonTab, ButtonTabItem, Toast, ToastPlugin } from 'vux'
console.log('socketIo', socketIo)

Vue.use(VueSocketio, socketio(socketIo))

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
Vue.component('x-textarea', XTextarea)
Vue.component('confirm', Confirm)
Vue.use(ToastPlugin)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
