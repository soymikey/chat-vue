<template>
  <div class="explore_container">
    <x-header>添加朋友</x-header>

    <search v-model="huntKey" position="absolute" auto-scroll-to-top top="46px" ref="search"></search>

    <scroller
      class="scroll"
      lock-x
      :height="scrollBoxHeight"
      ref="scrollerBottom"
      :scroll-bottom-offst="200"
    >
      <div>
        <div v-for="(item,index) in friendList" :key="index" @click='goFriendDetail(item._id)'>
          <panel>
            <div slot="body" class="panel_container">
              <div class="avartar_container">
                <img width="100%" :src="IMG_URL+ item.photo" />
              </div>
              <div class="body">
                <div class="title">{{item.nickname}}</div>
              </div>
            </div>
          </panel>
        </div>
        <!-- <load-more tip="loading"></load-more> -->
      </div>
    </scroller>
  </div>
</template>

<script>
import api from '@/api'
import { imgUrl } from '../../../config/env'

export default {
  data () {
    return {
      scrollBoxHeight: '',
      friendList: [],
      huntKey: '', // 搜索参数
      loadingSearch: false, // 加载动画
      IMG_URL: imgUrl,
      searchOptions: [
        {
          value: '2',
          label: '昵称'
        },
        {
          value: '1',
          label: 'Vchat号'
        }
      ],
      type: '2'
    }
  },
  created () {},

  mounted () {
    this.scrollBoxHeight = document.documentElement.clientHeight - 46 + 'px'
  },

  computed: {},

  watch: {
    huntKey () {
      this.huntFriends()
    }
  },
  methods: {
    goFriendDetail (id) {
      this.$router.push({ name: 'frienddetail', params: { id: id } })
    },
    huntFriends (t) {
      // 搜索群聊
      if (this.loadingSearch) {
        return
      }
      if (!this.huntKey) {
        if (t === 'click') {
          return
        }
        this.loadingSearch = true
        setTimeout(_ => {
          this.friendList = []
          this.loadingSearch = false
        }, 800)
        return
      }
      if (this.type === '1') {
        // 按群号查找 需要输入3位以上字符
        if (this.huntKey.length <= 3) {
          this.loadingSearch = true
          setTimeout(_ => {
            this.friendList = []
            this.loadingSearch = false
          }, 800)
          return
        }
      }

      this.loadingSearch = true
      let params = {
        key: this.huntKey,
        offset: 1,
        limit: 8,
        type: this.type
      }
      api.huntFriends(params).then(r => {
        if (r.code === 0) {
          this.friendList = r.data
        }
        this.loadingSearch = false
      })
    }
  }
}
</script>
<style lang="scss">
.scroll {
  background-color: #f7f7fa;
  padding-top: 44px;
}
.panel_container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  position: relative;
  .avartar_container {
    width: 15%;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  .badge {
    position: absolute;
    top: 5px;
    left: 15%;
  }
  .body {
    padding: 10px;
    width: 85%;
    .title {
      font-weight: 400;
      font-size: 17px;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
    .content {
      color: #999999;
      font-size: 13px;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
