<template>
  <div> 
    <el-dialog
      v-if="!hasLogin"
      v-model="dialogVisible"
      title="提示"
      width="30%"
    >
      <div>
        <component
          :is="login"
          :embed="true"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import login from '@/views/Login'
import store from '@/store' 
import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
export default {
  setup() {
    const hasLogin = computed(() => store.getters.hasLogin)
    console.log('store.state.settings.isShowLoginDialog',store.state.settings.isShowLoginDialog)
    // var dialogVisible = computed(()=>store.state.settings.isShowLoginDialog)
    // watch(dialogVisible,
    //   (val) => {
    //     console.log('aaaa')
    //     dialogVisible.value = val
    //   },{
    //     deep:true
    //   }
    // )
    // setInterval(() => {
    //   console.log(dialogVisible.value)
    // }, 3000);
    return {
      login,
      hasLogin,
      // dialogVisible: dialogVisible,
    }
  },
  computed:{
    dialogVisible:()=>store.getters.isShowLoginDialog
  },
  watch:{
    dialogVisible(val){
      console.log(val)
    }
  }
}
</script>

<style></style>
