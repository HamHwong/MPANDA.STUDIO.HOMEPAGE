<template>
  <div
    v-loading="disabled"
    element-loading-text="拼命提交中"
    element-loading-spinner="el-icon-loading"
    class="Markdown"
  >
    <el-container>
      <el-header height="40px">
        <PageHeader>
          <template #title>
            创建文章
          </template>
          <template #content>
            <Category
              v-model="form.cate"
              size="mini"
              :editable="true"
            />
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
                Submit
              </el-button>
              <el-button @click="handleClear">
                Clear
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
import { reactive, ref } from 'vue'
import { ElNotification as $notify } from 'element-plus'
import { Article } from '@/api'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const contentEditor = ref('')
    const form = reactive({
      title: '',
      content: '',
      cate:{},
    })
    const disabled = ref(false)
    const rule = reactive({})
    const articleForm = ref(null)
    const router = useRouter() 
    async function handleSubmit() {
      var body = {
        title: form.title,
        content: form.content,
        cate:form.cate,
      }
      disabled.value = true
      Article.Create(body)
        .then((res) => {
          const { IsSuccess, Data, Message } = res
          if (IsSuccess) {
            $notify({
              title: '成功',
              message: '提交成功！' ,
              type: 'success',
            })
            router.push('/')
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
        })
    }
    function handleClear() {
      contentEditor.value.setValue('')
    }

    return {
      contentEditor,
      handleSubmit,
      handleClear,
      form, 
      rule,
      disabled,
      articleForm,
      MDEditor,
      PageHeader,
      Category,
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
