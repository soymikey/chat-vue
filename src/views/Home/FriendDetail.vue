<template>
  <div class="explore_container">
    <x-header>详情</x-header>
    <div class="DetailImage-bg">
      <p class="title">{{friendInfo.nickname}}</p>
      <p>{{friendInfo.signature}}</p>
    </div>
    <div class="vchat-Detail-container friend-detail-container">
      <a class="detail-avatar">
        <img :src="IMG_URL + friendInfo.photo" alt />
      </a>
      <div class="firend-info">
        <p>Vchat：{{friendInfo.code}}</p>
        <p>性别：{{friendInfo.sex === '1' ? '男' : friendInfo.sex === '2' ? '女' : '保密'}}</p>
        <p>所在地：{{friendInfo.province.name + (friendInfo.city.name === '市辖区' ? '' : ' - ' + friendInfo.city.name) + ' - ' + friendInfo.town.name}}</p>
      </div>
      <div class="detail-item" v-if="friendInfo.code === user.code" @click="toPhoto">
        <span>照片墙</span>
        <p></p>
      </div>
      <div class="detail-button" v-if="friendInfo.code !== user.code">
        <x-button type="primary" @click.native="apply" v-if="!myFriendFlag">添加好友</x-button>
        <x-button type="primary" @click.native="remove" v-else>删除好友</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import env from '../../../config/env'
import api from '@/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      IMG_URL: env.imgUrl,
      friendInfo: { cover: [], province: {}, city: {}, town: {} }, // user详情
      showFriendQr: false, // 二维码开关
      myFriendFlag: false // 是否为我的好友
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.getUserInfo()
    this.checkMyfriends()
  },
  watch: {
    '$route' (to, from) {
      this.getUserInfo()
      this.checkMyfriends()
    }
  },

  methods: {
    apply () {
      localStorage.friend = JSON.stringify({
        userYname: this.friendInfo.nickname,
        userYloginName: this.friendInfo.name,
        userYphoto: this.friendInfo.photo
      })

      this.$router.push({
        name: 'friendrequest',
        params: { id: this.$route.params.id },
        query: {}
      })
    },
    remove () {},
    getUserInfo () {
      let params = {
        id: this.$route.params.id
      }
      api.getUserInfo(params).then(r => {
        if (r.code === 0) {
          this.friendInfo = r.data
        }
      })
    },
    toPhoto () {
      this.$router.push({ name: 'photoWall', params: this.$route.params })
    },
    checkMyfriends () {
      let params = {
        userM: this.$route.params.id,
        userY: this.user.id
      }
      api.checkMyfriends(params).then(r => {
        if (r.code === 0) {
          this.myFriendFlag = r.data
        }
      })
    }
  },
  created () {

  }
}
</script>
<style lang="scss">
</style>
