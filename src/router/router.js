import Vue from 'vue'
import Router from 'vue-router'

const login = r =>
  require.ensure([], () => r(require('@/views/login')), 'login') // client 登入页面
const home = r => require.ensure([], () => r(require('@/views/home')), 'home') // client 点餐页面

const adminLayout = r =>
  require.ensure([], () => r(require('@/views/adminLayout')), 'adminLayout')

const explain = r =>
  require.ensure([], () => r(require('@/views/explain')), 'explain')
const notFound = r => require.ensure([], () => r(require('@/views/404')), '404')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '/',
      component: Layout,

      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        } ] }

  ]
})
