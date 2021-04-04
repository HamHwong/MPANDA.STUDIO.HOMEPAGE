<!--
 * @Author: your name
 * @Date: 2021-01-07 15:23:46
 * @LastEditTime: 2021-04-04 22:38:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Aside/index.vue
-->
<template>
  <el-menu
    router
    :default-active="route_path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="route in routes">
      <template v-if="!route.meta.hidden">
        <el-submenu
          v-if="route.children && route.children.length > 0"
          :index="route_path"
        >
          <template #title>
            <i class="el-icon-location" />
            <span>Tools</span>
          </template>
          <el-menu-item
            v-for="croute in route.children"
            :index="croute.path"
          >
            {{ croute.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="route.path"
        >
          <i
            :class="`${route.meta.icon ? route.meta.icon : 'el-icon-location'}`"
          /> 
          <template #title>
            {{ route.name }}
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { routes } from "@/router/routes";
export default {
  data() {
    return {
      isCollapse: true,
      routes,
      route_path: routes[0] ? routes[0].path : "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleRoute(route) {
      this.$router.push(route);
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
