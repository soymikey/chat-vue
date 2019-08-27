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
import { mapState } from 'vuex'

import env from '../../../config/env'

export default {
  sockets: {
    ValidateSuccess () {
      this.$store.dispatch('getUserInfo', this)
    }
  },
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
    ...mapState(['user', 'unReadRequest'])

  },
  watch: {

  },
  methods: {
    onScrollBottom () {
    },
    agree (v) {
      v.userYphoto = this.user.photo
      v.userYname = this.user.nickname

      this.$socket.emit('agreeValidate', v)

      const newRequestUnRead = this.unReadRequest.filter(m => m.name !== v.name)

      this.$store.commit('setUnReadRequest', { reset: true, content: newRequestUnRead })
    }

  }
}
</script>
<style lang="scss">
.scroll {
  background-color: #f7f7fa;
}
</style>
