<template>
  <div>
    <el-container>
      <el-main>
        <el-row
          type="flex"
          style="justify-content: center;"
        >
          <el-col
            :xs="24"
            :md="8" 
          >
            <el-card>
              <loginForm @login="handleLoggedIn" />
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import loginForm from '@/components/Login'
import { useRoute, useRouter } from 'vue-router'
export default {
  emits: {
    login: null,
  },
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    function handleLoggedIn() {
      const { redirectTo = null } = route.query
      if (redirectTo) {
        router.push({ path: redirectTo })
      } else {
        router.push({ path: '/' })
      }
    }
    return {
      handleLoggedIn,
      loginForm,
    }
  },
}
</script>

<style lang="scss" scoped> 
</style>
