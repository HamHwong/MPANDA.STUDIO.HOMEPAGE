<template>
  <div> 
    <el-drawer
      title="我是标题" 
      :direction="direction" 
      v-bind="$attrs"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
export default {
  setup (props, context) { 
    var direction = ref('ltr')
    return { 
      direction
    }
  }
}
</script>

<style>
</style>