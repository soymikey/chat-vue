<template>
  <div class="explore_container">
    <x-header>
      <span slot="overwrite-left"></span>
      {{tabIndex===0?'登陆':'注册'}}
    </x-header>
    <scroller
      class="scroll"
      lock-x
      :height="scrollBoxHeight"
      @on-scroll-bottom="onScrollBottom"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <button-tab v-model="tabIndex">
        <button-tab-item @on-item-click="loginTab">登陆</button-tab-item>
        <button-tab-item @on-item-click="registerTab">注册</button-tab-item>
      </button-tab>
      <group :title="tabIndex===0?'登陆':'注册'">
        <x-input title="账号" v-model="signForm.name"></x-input>
        <x-input title="密码" v-model="signForm.pass"></x-input>
        <x-input title="确认密码" v-show="tabIndex===1" v-model="signForm.repass"></x-input>
        <x-input title="验证码" v-model="signForm.regcode">
          <canvas slot="right-full-height" ref="regcode" width="90" height="38"></canvas>
        </x-input>
      </group>
      <x-button
        class="button"
        @click.native="tabIndex===0?login():signUp()"
        type="primary"
        :show-loading="loading"
      >{{tabIndex===0?'登陆':'注册'}}</x-button>
    </scroller>
  </div>
</template>

<script>
import api from '../api'

import Canvas from 'vchat-regcode'

export default {
  data () {
    return {
      tabIndex: 0,
      scrollBoxHeight: '',
      loading: false,
      signForm: {
        name: '',
        pass: '',
        repass: '',
        regcode: ''
      },
      initCode: ''
    }
  },
  created () {},
  mounted () {
    this.scrollBoxHeight = document.documentElement.clientHeight - 46 + 'px'
    this.initRegcode()
  },
  computed: {},
  watch: {},
  methods: {
    initRegcode () {
      this.$nextTick(() => {
        this.regCodeClass = new Canvas(this.$refs['regcode'], {
          fontSize: 20,
          lineNum: 2,
          dotNum: 10
        })
        this.regCodeClass.draw(r => {
          this.initCode = r
        })
      })
    },
    loginTab () {
      this.initRegcode()
    },
    registerTab () {
      this.initRegcode()
    },
    onScrollBottom () {},
    toast (text, type = 'success') {
      this.$vux.toast.show({
        text,
        type
      })
    },
    signUp () {
      if (this.signForm.name === '') {
        this.toast('请输入账号', 'warn')
      } else if (this.signForm.pass === '') {
        this.toast('请输入密码', 'warn')
      } else if (this.signForm.repass === '') {
        this.toast('请输入确认密码', 'warn')
      } else if (this.signForm.pass !== this.signForm.repass) {
        this.toast('两次密码不一样', 'warn')
      } else if (
        this.signForm.regcode.toLowerCase() !== this.initCode.toLowerCase()
      ) {
        this.toast('验证码不正确', 'warn')
      } else {
        let params = {
          name: this.signForm.name,
          pass: this.signForm.pass
        }
        this.loading = true
        api.signUp(params).then(r => {
          if (r.code === 0) {
            this.toast('注册成功', 'success')
            this.signForm = {
              name: '',
              pass: '',
              repass: '',
              regcode: ''
            }
            this.tabIndex = 0
          } else if (r.code === 1) {
            this.$message.error('账号已存在')
          } else {
            this.$message.error('注册失败')
          }
          this.loading = false
        })
      }
    },
    login () {
      if (this.signForm.name === '') {
        this.toast('请输入账号', 'warn')
      } else if (this.signForm.pass === '') {
        this.toast('请输入密码', 'warn')
      } else if (
        this.signForm.regcode.toLowerCase() !== this.initCode.toLowerCase()
      ) {
        this.toast('验证码不正确', 'warn')
      } else {
        let params = {
          name: this.signForm.name,
          pass: this.signForm.pass
        }
        this.loading = true
        api.login(params).then(r => {
          if (r.code === 0) {
            this.toast('登录成功')
            this.$store.dispatch('getUserInfo', this)
          } else if (r.code === -1) {
            this.toast('账号不存在或密码错误', 'cancel')
            this.loading = false
          } else {
            this.toast('登录失败', 'cancel')
            this.loading = false
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.scroll {
  background-color: #f7f7fa;
}
.button {
  margin-top: 20%;
}
.regcode-box {
  .el-input {
    width: 205px;
  }
  canvas {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
