<!--
 * @Author: your name
 * @Date: 2020-12-22 23:36:22
 * @LastEditTime: 2021-04-04 22:19:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/App.vue
-->
<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import {onMounted,provide} from 'vue'
export default {
  name: "App",
  components: {
  }, 
  setup(props, context,ctx){ 
    window.addEventListener('resize',()=>{ 
    })
  },
  data(){
    return{
    }
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
