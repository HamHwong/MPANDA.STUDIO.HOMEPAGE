<!--
 * @Author: your name
 * @Date: 2021-03-04 16:24:36
 * @LastEditTime: 2021-05-05 15:46:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Index/index.vue
-->
<template>
  <div class="container">
    <NavTop fixed="top" />
    <TopBanner class="text-context">
      <p>Welcome</p>
      <p>To</p>
      <p>MPanda.Studio</p>
      <div class="dailywords center">
        <small>今日毒鸡汤:
          <span class="underline">{{
            DailyWords.text || '加载中...'
          }}</span></small>
      </div>
    </TopBanner>
    <el-row
      type="flex"
      style="margin:30px 10px 0 10px"
      :gutter="30"
    >
      <el-col
        :md="8"
        :sm="24"
      >
        <MPCard height="200px">
          <template #header>
            笔记
            <MPButton
              type="default"
              trigger="hover"
            >
              <template #reference>
                <router-link
                  v-if="hasLogin"
                  :to="{ path: '/Article/Create' }"
                >
                  <div>
                    发帖
                  </div>
                </router-link>
                <router-link :to="{ path: '/Article/Create' }">
                  <div>
                    查看所有
                  </div>
                </router-link>
              </template>
            </MPButton>
          </template>
          <ArticleList
            :start="0"
            :count="10"
            :order="{ createDate: -1 }"
          />
        </MPCard>
      </el-col>
      <el-col
        :md="8"
        :sm="24"
      >
        <MPCard
          type="primary"
          height="200px"
        />
      </el-col>
      <el-col
        :md="8"
        :sm="24"
      >
        <MPCard
          type="success"
          height="200px"
        />
      </el-col>
    </el-row>
    <div>
      <GameComponent v-if="EnableGame" />
    </div>
    <!-- Enter Btn -->
    <svgBotton @click="handleEnter" />
  </div>
</template>

<script>
import { Ext } from '@/api'
import { computed, onMounted, reactive, ref } from 'vue'
import TopBanner from '@/components/TopBanner'
import GameComponent from '@/components/Game'
import svgBotton from './components/svgBotton'
import NavTop from '@/components/TopNav'
import MPCard from '@/components/mp-card'
import MPButton from '@/components/mp-card/mp-card-button'
import ArticleList from '@/views/Articles/components/list'
import store from '@/store'
export default {
  setup(props, ctx) {
    var DailyWords = reactive({ text: '' })
    const hasLogin = computed(() => store.getters.hasLogin) 

    onMounted(async () => {
      const {
        Data: { data },
        IsSuccess,
      } = await Ext.getFuckingWords()
      if (IsSuccess) {
        DailyWords.text = data
      }
    })
    var EnableGame = ref(false)
    return {
      TopBanner,
      DailyWords,
      GameComponent,
      EnableGame,
      NavTop,
      svgBotton,
      MPCard,
      MPButton,
      ArticleList,
      hasLogin
    }
  },
  methods: {
    handleEnter() {
      setTimeout(() => {
        this.$router.push('/Controls')
      }, 700)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
  .text-context {
    .center {
      text-align: center;
    }
    .underline {
      padding-bottom: 2px;
      border-bottom: solid 0.15rem rgba(0, 0, 0, 0.2);
    }
    p {
      margin: 0;
    }
    small {
      font-size: 0.6rem;
      line-height: 0.6rem;
    }
  }
}
</style>
