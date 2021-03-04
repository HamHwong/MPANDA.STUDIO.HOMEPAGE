<!--
 * @Author: your name
 * @Date: 2020-12-22 23:36:22
 * @LastEditTime: 2021-03-04 16:44:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/App.vue
-->
<template>
  <div>
    <!-- <el-container> 
      <Aside/>
      <el-container>
        <Header/>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer><small>©1994-2021 MPanda Studio. All Rights Reserved.</small></el-footer>
      </el-container>
    </el-container> -->
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
// import HomePage from './components/HomePage'
// import Aside from './components/Aside'
// import Header from './components/Header'
// import layout from ''
export default {
  name: "App",
  data(){
    return{
    }
  },
  components: { 
    // Header,
    // Aside
  }, 
  computed:{
    layout(){
      return (this.$route.meta.layout||'default')+'-layout'
    }
  }
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

</style>
