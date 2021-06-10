<template>
  <div class="pageHeader_wrapper">
    <el-page-header
      :content="content"
      @back="goBack"
    >
      <template #title>
        <slot name="title" />
      </template>
      <template #content>
        <slot name="content" />
      </template>
      <template #icon>
        <slot name="icon" />
      </template>
    </el-page-header>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    content: {
      type: String,
      default: () => '',
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    function goBack() {
      ctx.emit('back')
      if (window.history.length <= 1) {
        router.push({ path: '/' })
      } else {
        router.push({ path: '/' })
      }
    }
    return {
      goBack,
    }
  },
}
</script>

<style lang="scss" scoped>
.pageHeader_wrapper {
  margin: 10px 0;
}
</style>
