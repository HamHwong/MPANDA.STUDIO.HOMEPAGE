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
        <PageHeader>
          <template #content>
            {{ article.title }}
          </template>
          <template
            v-if="article.cate && JSON.stringify(article.cate) !== '{}'"
            #title
          >
            {{ article.cate.cate_name }}
          </template>
        </PageHeader>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="12"> 
            <small>{{
              dateformat(article.createDate, 'yyyy-mm-dd HH:MM')
            }}</small>
          </el-col>
          <el-col
            :span="12"
            style="text-align:right"
          >
            <el-divider
              v-auth="['admin']"
              direction="vertical"
            />
            <el-button
              v-auth="['admin']"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit()"
            />
            <el-button
              type="primary"
              size="mini" 
              icon="el-icon-share"
            />
            <el-button
              v-auth="['admin']"
              type="primary"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(article._id)"
            />
            <el-divider
              v-auth="['admin']"
              direction="vertical"
            />
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-card> 
          <div ref="Content" />
        </el-card>
      </el-main>

      <el-footer>
        <!--  -->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { Article } from '@/api'
import {  onMounted, reactive, ref } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import PageHeader from '@/components/PageHeader'
import dateformat from 'dateformat'
import { ElMessageBox } from 'element-plus'
import { ElNotification as $notify } from 'element-plus'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { id } = route.params
    const Content = ref(null)
    let article = reactive({
      cate: {},
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
            Vditor.preview(Content.value, article.content)
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
 
    function handleDelete(id) {
      ElMessageBox.confirm('确认删除该文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await Article.Delete(id)
        $notify({
          title: '成功',
          message: '删除成功！',
          type: 'success',
        })
        router.push('/')
      })
    }
    function handleEdit(){ 
      router.push(`/Article/Update/${id}`)
    }
    function handleBack() {
      router.push('/')
    }
    return {
      loading,
      article,
      handleBack,
      PageHeader,
      dateformat,
      handleDelete,
      handleEdit,
      Content,
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
