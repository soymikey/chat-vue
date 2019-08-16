import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'normalize.css'
import 'vux/src/styles/reset.less'
import { XButton, Tabbar, TabbarItem, Group, Cell, XHeader, Search, Scroller, Card, Panel, XImg, LoadMore, XInput, Actionsheet } from 'vux'
Vue.config.productionTip = false
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
