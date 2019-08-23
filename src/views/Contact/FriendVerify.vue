<template>
  <div class="verify_container">
    <x-header></x-header>
    <div class="DetailImage-bg">
      <p class="title">{{friendInfo.nickname}}:{{friendInfo.mes}}</p>
      <p>{{friendInfo.signature}}</p>
    </div>
    <div class="vchat-Detail-container friend-detail-container">
      <a class="detail-avatar">
        <img :src="IMG_URL + friendInfo.avatar"  />
      </a>
      <div class="firend-info">
        <!-- <p>性别：{{friendInfo.sex === '1' ? '男' : friendInfo.sex === '2' ? '女' : '保密'}}</p> -->
        <!-- <p>所在地：{{friendInfo.province.name + (friendInfo.city.name === '市辖区' ? '' : ' - ' + friendInfo.city.name) + ' - ' + friendInfo.town.name}}</p> -->
      </div>
      <!-- <div class="detail-item" v-if="friendInfo.code === user.code" @click="toPhoto">
        <span>照片墙</span>
        <p></p>
      </div> -->
  </div>
  <x-button   @click.native="agree(friendInfo)"  type="primary">通过验证</x-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import env from '../../../config/env'

export default {
  data () {
    return {
      IMG_URL: env.imgUrl,
      friendInfo: {},
      scrollBoxHeight: ''

    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight =
      document.documentElement.clientHeight - 46 + 'px'
    this.friendInfo = this.$route.params
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getRequestList'])

  },
  watch: {
    '$route' (to, from) {
      this.friendInfo = this.$route.params
    }
  },
  methods: {
    onScrollBottom () {
    },
    agree (v) {
      v.userYphoto = this.user.photo
      v.userYname = this.user.nickname
      this.$socket.emit('agreeValidate', v)
      this.getRequestList.forEach(m => { // 更新同一申请人的所有相同请求
        if (m.userM === v.userM && m.type === 'validate' && (v.state === 'friend' || v.state === 'group')) {
          m.status = '1'
          m.visible = false
        }
      })
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style lang="scss">
.scroll {
  background-color: #f7f7fa;
}
</style>
