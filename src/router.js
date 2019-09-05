import Vue from 'vue'
import Router from 'vue-router'

const Layout = r =>
  require.ensure([], () => r(require('@/views/Layout')), 'Layout')
const Home = r => require.ensure([], () => r(require('@/views/Home/Home')), 'Home')

const AddFriend = r => require.ensure([], () => r(require('@/views/Home/AddFriend')), 'AddFriend')
const FriendDetail = r => require.ensure([], () => r(require('@/views/Home/FriendDetail')), 'FriendDetail')
const FriendRequest = r => require.ensure([], () => r(require('@/views/Home/FriendRequest')), 'FriendRequest')
const Conversation = r => require.ensure([], () => r(require('@/views/Home/Conversation')), 'Conversation')

const Contact = r => require.ensure([], () => r(require('@/views/Contact/Contact')), 'Contact')
const FriendVerify = r => require.ensure([], () => r(require('@/views/Contact/FriendVerify')), 'FriendVerify')

const Explore = r => require.ensure([], () => r(require('@/views/Explore/Explore')), 'Explore')
const User = r => require.ensure([], () => r(require('@/views/User/User')), 'User')
const Setting = r => require.ensure([], () => r(require('@/views/User/Setting')), 'Setting')
const Avatar = r => require.ensure([], () => r(require('@/views/User/Avatar')), 'Avatar')
const UserInfo = r => require.ensure([], () => r(require('@/views/User/UserInfo')), 'UserInfo')
const Register = r => require.ensure([], () => r(require('@/views/Register')), 'Register')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: { path: '/register' },
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
          path: '/frienddetail/:id',
          name: 'frienddetail',

          component: FriendDetail
        },
        {
          path: '/friendrequest',
          name: 'friendrequest',
          component: FriendRequest
        },
        {
          path: '/conversation/:id',
          name: 'conversation',

          component: Conversation
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact
        },
        {
          path: '/friendverify',
          name: 'friendverify',
          component: FriendVerify
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
        },
        {
          path: '/userinfo',
          name: 'userinfo',
          component: UserInfo
        },
        {
          path: '/avatar',
          name: 'avatar',
          component: Avatar
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        },

        {
          path: '/register',
          name: 'register',
          component: Register
        }
      ]

    }

  ]
})
