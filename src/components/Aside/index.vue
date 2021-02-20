<!--
 * @Author: your name
 * @Date: 2021-01-07 15:23:46
 * @LastEditTime: 2021-02-20 16:58:52
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
        <router-link :to="{ path: '/PlayGround' }">
          <el-menu-item index="1-1"> Playground </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/Home' }">
          <el-menu-item index="1-2"> Home </el-menu-item>
        </router-link>
        <router-link :to="{ path: '/' }">
          <el-menu-item index="1-2"> 自定义控件 </el-menu-item>
        </router-link>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <template #title>导航二</template>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <template #title>导航3</template>
    </el-menu-item>
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
