<template>
  <div
    v-loading="disabled"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    class="Markdown"
  >
    <el-container>
      <el-header height="40px">
        <PageHeader>
          <template #title>
            编辑文章
          </template>
          <template #content>
            <Category
              v-model="form.cate"
              size="mini"
              :editable="true"
            />
          </template>
          <template #icon>
            <div>asa</div>
          </template>
        </PageHeader>
      </el-header>
      <el-main>
        <el-form
          ref="articleForm"
          v-model="form"
          size="mini"
          :rules="rule"
          :disabled="disabled"
        >
          <el-form-item
            label="文章标题"
            prop="title"
          >
            <el-row>
              <el-input v-model="form.title" />
            </el-row>
          </el-form-item>
          <el-form-item prop="content">
            <el-row>
              <el-col>
                <MDEditor
                  v-model="form.content"
                  :disabled="disabled"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-row
            type="flex"
            justify="center"
            style="margin-top:10px"
          >
            <el-form-item>
              <el-button
                type="primary"
                @click="handleSubmit"
              >
                更 新
              </el-button> 
            </el-form-item>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MDEditor from '../components/editor'
import PageHeader from '@/components/PageHeader'
import Category from '@/components/Category'
import { onMounted, reactive, ref } from 'vue'
import { ElNotification as $notify } from 'element-plus'
import { Article } from '@/api'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const contentEditor = ref('')
    const form =  reactive({
      cate: {},
      content: '',
      createDate: '',
      id: '',
      title: '',
      updateDate: '',
      _id: '',
    })
    const disabled = ref(false)
    const rule = reactive({})
    const articleForm = ref(null)
    const router = useRouter() 
    const route = useRoute()
    const loading = ref(false)
    const id = route.params.id
    var loadingText = ref('拼命加载中')
    onMounted(() => {
      loading.value = true
      disabled.value = true
      Article.Get(id)
        .then((res) => {
          const { Data, Message, IsSuccess } = res
          if (IsSuccess) {
            for (var i in form) {
              form[i] = Data[i] 
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
          disabled.value = false
        })
    })
 
    async function handleSubmit() {
      var body = {
        _id :form._id,
        title: form.title,
        content: form.content,
        cate:form.cate,
      }
      disabled.value = true
      loadingText.value="拼命提交中"
      console.log(body)
      Article.Update(form._id,body)
        .then((res) => {
          const { IsSuccess, Data, Message } = res
          if (IsSuccess) {
            $notify({
              title: '成功',
              message: '更新成功！' ,
              type: 'success',
            })
            router.push({path:`/Article/View/${form._id}`})
          } else {
            throw new Error(Message)
          }
        })
        .catch((e) => {
          $notify({
            title: '失败',
            message: '提交失败：' + e,
            type: 'error',
          })
        })
        .finally(() => {
          disabled.value = false
          loadingText.value="拼命加载中"
        })
    } 

    return {
      contentEditor,
      handleSubmit, 
      form, 
      rule,
      disabled,
      articleForm,
      MDEditor,
      PageHeader,
      Category,
      loadingText
    }
  },
}
</script>

<style lang="scss" scoped>
.Markdown {
  text-align: left;
  margin: 10px 20px;
}
:deep(.vditor-toolbar--pin){
  position:unset;
}
</style>
