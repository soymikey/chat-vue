import Vue from 'vue'
import Router from 'vue-router'

const Layout = r =>
  require.ensure([], () => r(require('@/views/Layout')), 'Layout')
const Home = r => require.ensure([], () => r(require('@/views/Home/Home')), 'Home')

const AddFriend = r => require.ensure([], () => r(require('@/views/Home/AddFriend')), 'AddFriend')
const Conversation = r => require.ensure([], () => r(require('@/views/Home/Conversation')), 'Conversation')

const Contact = r => require.ensure([], () => r(require('@/views/Contact/Contact')), 'Contact')
const Explore = r => require.ensure([], () => r(require('@/views/Explore/Explore')), 'Explore')
const User = r => require.ensure([], () => r(require('@/views/User/User')), 'User')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: { path: '/home' },
      children: [
        {
          path: '/home',
          name: 'home',

          component: Home
        },
        {
          path: '/addfriend',
          name: 'addfriend',

          component: AddFriend
        },
        {
          path: '/conversation',
          name: 'conversation',

          component: Conversation
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact
        },
        {
          path: '/explore',
          name: 'explore',
          component: Explore
        },
        {
          path: '/user',
          name: 'user',
          component: User
        }
      ]

    }

  ]
})
