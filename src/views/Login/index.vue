<template>
  <div>
    <el-container class="container">
      <el-main class="main">
        <el-row
          type="flex"
          style="justify-content: center;"
        >
          <el-col style="display: flex;justify-content: center;">
            <img
              class="logo_no_bg"
              :src="require('@/static/logo_nobg.png')"
            >
          </el-col>
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
    // function getBGImage(){
    //   console.log(require('@/static/logo_nobg.png'))
    //   return 'url('+require('@/static/logo_nobg.png')+') no-repeat cover;'
    // }
    return {
      handleLoggedIn,
      loginForm, 
    }
  },
}
</script>

<style lang="scss" scoped>
$logo_width:819px;
$logo_height:655px;
$scale:.2;
.container {
  height: 100vh;
  background: #00B4DB;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .main {
    height: 100%;
    display: flex;
    align-items: center;
    .logo_no_bg{
      width: $logo_width * $scale;
      height: $logo_height * $scale; 
      margin-bottom: 30px;
    }
  }
}
</style>
