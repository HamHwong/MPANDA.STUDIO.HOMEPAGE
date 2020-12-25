<!--
 * @Author: your name
 * @Date: 2020-12-22 23:36:22
 * @LastEditTime: 2020-12-24 10:15:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/App.vue
-->
<template>
<div>
  <img alt="Vue logo" src="@/static/logo.png">
  <Uploader />
</div>
</template>

<script>
import Uploader from './components/Uploader'
export default {
  name: 'App',
  components: {
    Uploader
  },
  mounted(){
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
