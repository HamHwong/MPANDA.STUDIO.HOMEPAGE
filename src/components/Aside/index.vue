<!--
 * @Author: your name
 * @Date: 2021-01-07 15:23:46
 * @LastEditTime: 2021-02-20 17:23:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Aside/index.vue
-->
<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template #title>Tools</template>
        <router-link :to="{ path: '/' }">
          <el-menu-item index="1-1"> 控件库 </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/PlayGround' }">
          <el-menu-item index="1-2"> Playground </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/Home' }">
          <el-menu-item index="1-3"> 上传页面 </el-menu-item>
        </router-link>
      </el-menu-item-group> 
    </el-submenu> 
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
