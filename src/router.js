import Vue from 'vue'
import Router from 'vue-router'

const Layout = r =>
  require.ensure([], () => r(require('@/views/Layout')), 'Layout')
const Home = r => require.ensure([], () => r(require('@/views/Home')), 'Home')
const About = r => require.ensure([], () => r(require('@/views/About')), 'About')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',

          component: Home
        },
        {
          path: '/about',
          name: 'about',

          component: About
        }
      ]
    }

  ]
})
