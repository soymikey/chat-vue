import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import { XButton, Tabbar, TabbarItem, Group, Cell } from 'vux'
Vue.config.productionTip = false
Vue.component('x-button', XButton)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
