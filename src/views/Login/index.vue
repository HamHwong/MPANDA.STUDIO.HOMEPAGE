<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col
            :span="8"
            :offset="8"
          >
            <el-card>
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
                      @click="handleLogin"
                    >
                      登录
                    </el-button>
                    <el-button
                      type="primary"
                      @click="handleReset"
                    >
                      重置
                    </el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { ElNotification as $notify } from 'element-plus'
import { Auth } from '@/api'
import {Encode} from '@/utils/crypto'
export default {
  setup() {  
    console.log(Encode('gougou'))
    console.log(Encode('admin'))
    const form = reactive({
      account: '',
      password: '',
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
    const formRef = ref(null)
    var isLoading = ref(false)
    function handleLogin() {
      formRef.value.validate((valid, err) => {
        if (valid) {
          isLoading.value = true
          const {account,password} = form 
          Auth.Login({account,password})
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              $notify({
                title: '错误',
                message: '验证失败:' + err,
                type: 'error',
              })
            })
            .finally(() => {
              isLoading.value = false
            })
          console.log('submitted')
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
    }
  },
}
</script>

<style></style>
