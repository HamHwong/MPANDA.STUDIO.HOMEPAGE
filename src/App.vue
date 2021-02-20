<!--
 * @Author: your name
 * @Date: 2020-12-22 23:36:22
 * @LastEditTime: 2021-02-20 17:41:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/App.vue
-->
<template>
  <div>
    <el-container>
      <!-- <HomePage /> -->
      <Aside/>
      <el-container>
        <el-header style="box-shadow: #afb1b3 0 0 20px;"> 
          <div class="header-warpper">
            <!-- <div>
              Welcome To MPanda.Studio
            </div> -->
              <el-tooltip class="item" :manual="manual" v-model="showSlogen" effect="dark" content="Welcome To MPanda.Studio" placement="left">
                <img style="width:40px;height:40px;margin-left:10px" :src="require('@/static/logo.png')" />
              </el-tooltip>
            
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer><small>©1994-2021 MPanda Studio. All Rights Reserved.</small></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import HomePage from './components/HomePage'
import Aside from './components/Aside'
export default {
  name: "App",
  components: {
    // HomePage,
    Aside
  },
  data(){
    return {
      showSlogen:false,
manual:true
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSlogen = true
    }, 1000);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  border: 0;
  /* margin-top: 60px; */
}
</style>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  background-color:#f4f6f9
}
.header-warpper{
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
}
</style>
