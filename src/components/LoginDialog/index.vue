<template>
  <div>
    <el-dialog
      :model-value="dialogVisible"
      title="登录"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <login-form @login="handleLogin" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import loginForm from '@/components/Login'
import store from '@/store'
import { computed, watch } from '@vue/runtime-core'
export default {
  setup() { 
    var dialogVisible = computed(() => store.state.settings.isShowLoginDialog)
    function handleClose() {
      store.dispatch('settings/hideLogin')
    }
    watch(
      dialogVisible,
      function(val) { 
        console.log('Changed!',val)
      },
      {
        immediate: true,
        deep: true,
      }
    )
    function handleLogin() {
      store.dispatch('settings/hideLogin')
    }
    return { 
      dialogVisible,
      handleClose,
      handleLogin,
      loginForm,
    }
  },
}
</script>

<style></style>
