<template>
  <div class="explore_container">
    <x-header  :right-options="{showMore: true}"  @on-click-more="showOptions = true">
      个人头像
    </x-header>
    <div class="image-container">
<img  class="image" :src="avatarUrl" alt="">
    </div>

    <div v-transfer-dom>
      <actionsheet :menus="options" v-model="showOptions" show-cancel @on-click-menu="handleOptions"></actionsheet>

      <input type="file"  @change="InmageChange" class='upload-picture' ref="chooseInmage" accept="image/png, image/jpeg, image/gif, image/jpg">
    </div>
  </div>
</template>

<script>
import { TransferDom } from 'vux'

import { mapState } from 'vuex'
import env from '../../../config/env'
import api from '@/api'

export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      avatarUrl: '',
      options: {
        takePicture: '拍照',
        uploadPicture: '从手机相册选择',
        savePicture: '保存图片'

      },

      showOptions: false

    }
  },
  created () {},
  mounted () {
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user: {
      handler () {
        let imageUrl = env.imgUrl.slice(0, env.imgUrl.length - 1)

        this.avatarUrl = imageUrl + this.user.photo
      },
      immediate: true,
      deep: true
    }
  },
  methods: {

    handleOptions (value) {
      if (value === 'uploadPicture') {
        this.$refs.chooseInmage.click()
      } else {
        this.$vux.toast.show({
          text: value + '功能开发中..',
          type: 'warn'
        })
      }
    },
    InmageChange () {
      let f = this.$refs['chooseInmage'].files[0]
      if (f.type.indexOf('image') === -1) {
        this.$vux.toast.show({
          text: '只能上传图片!',
          type: 'warn'
        })
        return
      }
      const isLt1M = f.size / 1024 / 1024 < 1
      if (!isLt1M) {
        // this.$message.error('图片大小不能超过 1MB!')
        this.$vux.toast.show({
          text: '图片大小不能超过 1MB!',
          type: 'warn'
        })
        return
      }
      let formdata = new FormData()
      formdata.append('f', f)

      api.uploadFile(formdata).then(r => {
        if (r.code === 0) {
          this.getAvatar(r.data)
        } else {
          this.$vux.toast.show({
            text: '上传失败',
            type: 'warning'
          })
        }
      })
    },
    getAvatar (url) { // 裁剪后的图像路径
      api.upUserInfo({ photo: url, unlink: this.$store.state.user.photo }).then(r => {
        if (r.code === 0) {
          this.$vux.toast.show({
            text: '保存头像成功',
            type: 'success'
          })

          this.$store.commit('setUser', { photo: url })
        } else {
          this.$vux.toast.show({
            text: '保存头像失败',
            type: 'warning'
          })
        }
      })
    }
  }
}

</script>
<style lang="scss" scope>
.image-container{
 .image{
   width: 100%;
   margin-top: 30%;
 }
}
.upload-picture{
  position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 0%;
    opacity: 0;
}
</style>
