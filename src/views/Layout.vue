
<template>
  <div class="layout">
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <tabbar v-show="isMainNav">
      <tabbar-item link="/home" :badge="unReadCount !== 0?unReadCount.toString():null">
        <i slot="icon" class="iconfont icon-message"></i>
        <span slot="label">微信</span>
      </tabbar-item>

      <tabbar-item
        link="/contact"
        :badge="unReadRequest.length!== 0?unReadRequest.length.toString():null"
      >
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
    return {}
  },
  components: {},
  sockets: {
    connect: function (val) {
      console.log(this.$socket.id)
      console.log('连接成功')
      this.$router.replace({ name: 'register' })
      // this.$store.dispatch('getUserInfo', this)
    },

    joined (OnlineUser) {
      console.log('加入了', OnlineUser)
      this.$store.commit('setOnlineUser', OnlineUser)
    },

    getHistoryMessages (mesdata) {
      let data = mesdata.filter(
        v =>
          v.read.indexOf(this.user.name) === -1 &&
          v.type !== 'info' &&
          v.type !== 'validate'
      )
      let validate = mesdata.filter(
        v => v.type === 'validate' && v.status === '0'
      )

      // let data = mesdata.filter(v => v.read.indexOf(this.user.name) === -1 && v.type !== 'info' && v.type !== 'validate')
      // 聊天历史记录

      if (data.length) {
        this.$store.commit('setUnRead', {
          roomid: data[0].roomid,
          count: data.length,
          lastMes: data[data.length - 1]
        })
      } else {
        if (mesdata.length) {
          this.$store.commit('setUnRead', {
            roomid: mesdata[0].roomid,
            count: 0,
            lastMes: mesdata[mesdata.length - 1]
          })
        } else {
          this.$store.commit('setUnRead', { roomid: 0, count: 0, lastMes: {} })
        }
      }
      if (validate.length) {
        console.log('validate', validate)

        this.$store.commit('setUnReadRequest', {
          reset: false,
          content: validate
        })
      }
    },
    mes (r) {
      // 更改未读消息数量

      this.$store.commit('setUnRead', {
        roomid: r.roomid,
        add: true,
        count: 1,
        lastMes: r.mes
      })
    },
    takeValidate (r) {
      if (r.type === 'validate') {
        this.$store.commit('setUnReadRequest', { reset: false, content: r })
      }

      if (r.type === 'info') {
        this.$store.dispatch('getUserInfo')
      }
    }
  },
  computed: {
    ...mapState(['user', 'conversationsList', 'OnlineUser', 'unReadRequest']),
    ...mapGetters(['unReadCount', 'unReadRequestCount']),
    isMainNav () {
      return (
        ['home', 'contact', 'explore', 'user'].indexOf(this.$route.name) !== -1
      )
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
