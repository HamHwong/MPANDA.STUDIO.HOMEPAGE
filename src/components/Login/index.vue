<template>
  <el-form
    ref="formRef"
    v-loading="isLoading"
    :model="form"
    size="mini"
    label-position="left"
    :rules="rules"
    label-width="70px"
  >
    <el-row>
      <el-col>
        <el-form-item
          prop="account"
          label="账号"
        >
          <el-input
            v-model="form.account"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item
          prop="password"
          label="密码"
        >
          <el-input
            v-model="form.password"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button
          type="primary"
          size="mini"
          @click="handleLogin"
        >
          登录
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleReset"
        >
          重置
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { ElNotification as $notify } from 'element-plus'
import { Auth } from '@/api'
import { Encode } from '@/utils/crypto'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router' 
export default {
  emits:{
    login:null
  },
  setup(props, context) { 
    const form = reactive({
      account: 'gougou1239',
      password: 'gougou',
    })
    const rules = reactive({
      account: [
        {
          required: true,
          message: '必须输入账号!',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '必须输入密码!',
          trigger: 'blur',
        },
      ],
    })
    let formRef = ref(null)
    var isLoading = ref(false)
    function handleLogin() { 
      formRef.value.validate(function(valid, err){
        if (valid) {
          isLoading.value = true
          const { account, password } = form
          Auth.Login({ account, password: Encode(password) })
            .then(async (res) => {
              const { IsSuccess, Message, Data } = res
              if (IsSuccess) {
                // console.log('Data',Data)
                await store.dispatch('user/update_user_info', Data)
                $notify({
                  title: '登录成功!',
                  message: `欢迎回来 ${store.getters.userDisplayName} !`,
                  type: 'success',
                  position: 'bottom-right'
                }) 
                context.emit('login') 
              } else {
                throw new Error(Message)
              }
            })
            .catch((err) => {
              $notify({
                title: '错误',
                message: err.message,
                type: 'error',
              })
            })
            .finally(() => {
              isLoading.value = false
            })
        } else {
          var errArr = []
          for (var key in err) {
            errArr = errArr.concat(err[key])
          }
          $notify({
            title: '错误',
            message: '验证失败:' + errArr[0].message,
            type: 'error',
          })
          return false
        }
      })
    }
    function handleReset() {
      formRef.value.resetFields()
    }
    return {
      form,
      rules,
      handleLogin,
      handleReset,
      formRef,
      isLoading,
      // Dispatch
    }
  },
}
</script>

<style></style>
