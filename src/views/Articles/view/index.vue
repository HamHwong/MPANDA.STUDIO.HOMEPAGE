<!--
 * @Author: your name
 * @Date: 2021-05-04 22:04:12
 * @LastEditTime: 2021-05-05 17:36:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\views\Articles\view\index.vue
-->
<template>
  <div
    v-loading="loading"
    class="Markdown"
  >
    <el-container direction="vertical">
      <el-header>
        <el-row type="flex">
          <el-col>
            <h1 style="margin-bottom:5px">
              {{ article.title }}
            </h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            {{ article.createDate }}
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-card>
          <vue3-markdown-it :source="article.content" />
        </el-card>
      </el-main>
      <el-footer>
        <el-button
          size="mini"
          @click="handleBack"
        >
          返回
        </el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { Article } from '@/api'
import { onMounted, reactive, ref } from 'vue'
import 'vditor/dist/index.css' 
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { id } = route.params
    let article = reactive({
      cate: '',
      cateId: '',
      content: '',
      createDate: '',
      id: '',
      title: '',
      updateDate: '',
      _id: '',
    })

    const loading = ref(false)
    onMounted(() => {
      loading.value = true
      Article.Get(id)
        .then((res) => {
          const { Data, Message, IsSuccess } = res
          if (IsSuccess) {
            for (var i in article) {
              article[i] = Data[i]
            }
          } else {
            throw new Error(Message)
          }
        })
        .catch((e) => {
          throw new Error(e)
        })
        .finally(() => {
          loading.value = false
        })
    })

    function handleBack() {
      router.push('/')
    }
    return {
      loading,
      article,
      handleBack,
    }
  },
}
</script>

<style lang="scss" scoped>
.Markdown {
  text-align: left;
  margin: 10px 20px;
}
</style>
