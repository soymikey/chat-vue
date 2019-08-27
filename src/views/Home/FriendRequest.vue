<template>
  <div class="friend_request_container">
    <x-header>验证信息</x-header>

    <group title="个人介绍">
      <x-textarea :max="90" name="description" v-model="introduce" placeholder="输入不超过90个字"></x-textarea>
    </group>
    <div style='display:flex;justify-content:center;margin-top:30px'>
      <x-button  type="primary" mini  @click.native="send">发送</x-button>
    </div>
<div v-transfer-dom>
      <confirm
      v-model="showConfirm"
      :show-cancel-button="false"
      title="请求发送成功，等待审核"
      @on-confirm="onConfirm">

      </confirm>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatTime } from '@/utils/utils'
import { TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      introduce: '',
      showConfirm: false
    }
  },
  created () {},
  mounted () {},
  computed: {
    ...mapState(['user', 'Vchat'])
  },
  watch: {},
  methods: {
    onConfirm () {
      this.$router.go(-1)
    },
    send () {
      let friend = JSON.parse(localStorage.friend)
      let val = {
        name: this.user.name,
        mes: this.introduce,
        time: formatTime(new Date()),
        avatar: this.user.photo,
        nickname: this.user.nickname,
        signature: this.user.signature,
        read: [],
        userM: this.user.id,
        userY: this.$route.params.id,
        userYname: friend.userYname,
        userYphoto: friend.userYphoto,
        userYloginName: friend.userYloginName,
        friendRoom: this.user.id + '-' + this.$route.params.id,
        roomid: this.$route.params.id + '-' + this.Vchat.id.split('-')[1],
        state: 'friend',
        type: 'validate',
        status: '0'
      }
      this.introduce = ''
      this.$socket.emit('sendValidate', val)
      this.showConfirm = true
    }
  }
}
</script>
<style lang="scss">
.scroll {
  background-color: #f7f7fa;
}
.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
