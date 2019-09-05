<template>
  <div class="explore_container">
    <x-header>
      设置
    </x-header>
    <scroller
      class="scroll"
      lock-x
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>
        <div v-for="(value, name, index) in initialList" :key='index'>

        <group    v-if="index<4">

          <cell @click.native="setting(item.name)" :title="item.name" is-link :value='item.value' v-for="(item,i) in value" :key="i"  >

          </cell>
        </group>
        <group   @click.native="()=>{}" v-else>

          <cell  @click.native="setting(item.name)" :title="item.name"   :value='item.value' v-for="(item,i) in value" :key="i"  >
          </cell>

        </group>
        </div>
      </div>
    </scroller>
    <div v-transfer-dom>
      <actionsheet :menus="options" v-model="showOptions" show-cancel @on-click-menu="handleOptions"></actionsheet>
    </div>
  </div>
</template>

<script>
import { TransferDom } from 'vux'
import api from '@/api'
import { formatTime } from '@/utils/utils'
import { mapState } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      options: [
        { label: '退出登录',
          type: 'warn' }
      ],

      showOptions: false,
      scrollBoxHeight: '',
      initialList: {
        list1: [
          { name: '账号与安全' }

        ],
        list2: [
          { name: '新消息通知' },
          { name: '隐私' },
          { name: '通用' }

        ],
        list3: [
          { name: '帮助与回馈' },
          { name: '关于微信', value: '版本7.0.3' }

        ],
        list4: [
          { name: '插件' }

        ],
        list5: [
          { name: '切换账号' }

        ],
        list6: [
          { name: '退出登录' }

        ]
      }
    }
  },
  created () {},
  mounted () {
  },
  computed: {
    ...mapState(['conversationsList', 'user'])
  },
  watch: {},
  methods: {
    leaveRoom () {
      this.conversationsList.forEach(v => {
        let val = {
          name: this.user.name,
          time: formatTime(new Date()),
          avatar: this.user.photo,
          roomid: v.id
        }
        this.$socket.emit('leave', val)
      })
    },
    loginOut () {
      this.leaveRoom()
      api.loginOut().then(r => {
        if (r.code === 0) {
          this.$vux.toast.show({
            text: '退出成功',
            type: 'success'
          })

          this.$store.commit('setUser', 'out')
          this.$router.replace('/')
        }
      })
    },
    setting (value) {
      if (value === '退出登录') {
        this.showOptions = true
      } else {
        this.$vux.toast.show({
          text: value + '功能开发中..',
          type: 'warn'
        })
      }
    },
    handleOptions () {
      this.loginOut()
    }
  }
}
</script>
