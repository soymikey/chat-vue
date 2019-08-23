
<template>
  <div class="layout">
    <keep-alive>
      <router-view :currSation='conversationCurrSation'
      @setConversationCurrSation="setConversationCurrSation"
      @NewMes='getNewMes'
       :latestMes='homeLatestMes'
      :unReadRequest='unReadRequest'
      ></router-view>
    </keep-alive>

    <tabbar v-show='isMainNav'>
      <tabbar-item link="/home" :badge='unReadCount.toString()' v-if='unReadCount !== 0'>
        <i slot="icon" class="iconfont icon-message"></i>
        <span slot="label">微信</span>{{unReadRequest}}
      </tabbar-item>
      <tabbar-item link="/home" v-else>
        <i slot="icon" class="iconfont icon-message"></i>
        <span slot="label">微信</span>
      </tabbar-item>

      <tabbar-item  link="/contact"  :badge='unReadRequest.length.toString()' v-if='unReadRequest.length !== 0'>
        <i slot="icon" class="iconfont icon-contact"></i>
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item  link="/contact" v-else >
        <i slot="icon" class="iconfont icon-contact"></i>
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item link="/explore">
        <i slot="icon" class="iconfont icon-explore"></i>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item link="/user">
        <i slot="icon" class="iconfont icon-user"></i>
        <span slot="label">我</span>
      </tabbar-item>

    </tabbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatTime } from '../utils/utils'
export default {
  data () {
    return {
      conversationCurrSation: {},
      homeLatestMes: {}

    }
  },
  components: {},
  sockets: {
    connect: function (val) {
      console.log(this.$socket.id)
      console.log('连接成功')
    },
    customEmit: function (val) {
      console.log('连接失败')
    },
    joined (OnlineUser) {
      console.log('加入了', OnlineUser)
      this.$store.commit('setOnlineUser', OnlineUser)
    },
    leaved (OnlineUser) {
      this.$store.commit('setOnlineUser', OnlineUser)
    },
    getHistoryMessages (mesdata) { // 获取未读消息数量
      let data = mesdata.filter(v => v.read.indexOf(this.user.name) === -1)
      let requestList = mesdata.filter(v => v.type === 'validate' && v.status === '0')
      if (data.length) {
        this.$store.commit('setUnRead', { roomid: data[0].roomid, count: data.length })
        this.getNewMes(mesdata[mesdata.length - 1])
      }

      if (requestList.length) {
        this.$store.commit('setUnReadRequest', requestList)
      }
    },
    mes (r) { // 更改未读消息数量
      if (r.typpe !== 'validate') {
        this.$store.commit('setUnRead', { roomid: r.roomid, add: true, count: 1 })
      }

      this.getNewMes(r)
    },
    takeValidate (r) {
      // this.$store.commit('setUnRead', { roomid: r.roomid, add: true, count: 1 })
      this.getNewMes(r)
      if (r.type === 'info') {
        this.$store.dispatch('getUserInfo')
      }
    }
  },
  computed: {
    ...mapState(['user', 'conversationsList', 'OnlineUser', 'unReadRequest']),
    ...mapGetters(['unReadCount', 'List']),
    isMainNav () {
      return ['home', 'contact', 'explore', 'user'].indexOf(this.$route.name) !== -1
    }
  },
  watch: {
    conversationsList: {
      handler () {
        this.joinRoom()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    joinRoom () {
      if (!this.user.name) {
        return
      }
      this.conversationsList.forEach(v => {
        let val = {
          name: this.user.name,
          time: formatTime(new Date()),
          avatar: this.user.photo,
          roomid: v.id
        }
        let room = { roomid: v.id, offset: 1, limit: 200 }

        this.$socket.emit('join', val)
        this.$socket.emit('getHistoryMessages', room)
      })
    },
    setConversationCurrSation (value) {
      this.conversationCurrSation = value
    },
    getNewMes (value) {
      if (value.type === 'validate' && value.status === '0') {
        this.$store.commit('setUnReadRequest', value)
      }
      this.homeLatestMes = value
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
