<template>
  <div class="explore_container">
    <x-header>
      个人信息
    </x-header>
    <scroller
      class="scroll"
      lock-x
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>

        <group   v-for="(value, name, index) in initialList" :key='index'>
            <cell  @click.native="userInfoOptions(item.name)" :title="item.name" is-link  v-for="(item,i) in value" :key="i"  >
              <div v-if="item.name==='头像'" slot='value'>
                 <img  width="50" style="display:block;margin-right:15px; " :src="item.value" />
              </div>
              <div v-else slot='value'>{{item.value}}</div>
          </cell>

        </group>

      </div>
    </scroller>

  </div>
</template>

<script>
import api from '@/api'
import { formatTime } from '@/utils/utils'
import { mapState } from 'vuex'
import env from '../../../config/env'

export default {

  data () {
    return {
      options: [
        { label: '退出登录',
          type: 'warn' }
      ],

      showOptions: false,
      scrollBoxHeight: '',
      initialList: { }
    }
  },
  created () {},
  mounted () {
  },
  computed: {
    ...mapState(['conversationsList', 'user'])
  },
  watch: {
    user: {
      handler () {
        let imageUrl = env.imgUrl.slice(0, env.imgUrl.length - 1)

        this.initialList = { list1: [
          { name: '头像', value: imageUrl + this.user.photo },
          { name: '名字', value: this.user.name },
          { name: '微信号', value: this.user.code },
          { name: '我的二维码' },
          { name: '更多' }

        ],
        list2: [ { name: '我的地址' } ] }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {

    userInfoOptions (value) {
      if (value === '头像') {
        console.log('头像')

        this.$router.push({ name: 'avatar' })
      } else {
        this.$vux.toast.show({
          text: value + '功能开发中..',
          type: 'warn'
        })
      }
    }

  }
}
</script>
