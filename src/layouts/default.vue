<!--
 * @Author: your name
 * @Date: 2021-03-04 16:32:07
 * @LastEditTime: 2021-03-04 16:47:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/layout/default.vue
-->
<template>
  <fragment>
    <el-container>
      <!-- <HomePage /> -->
      <Aside />
      <el-container>
        <Header />
        <el-main>
          <slot/>
        </el-main>
        <el-footer>
          <small>©1994-2021 MPanda Studio. All Rights Reserved.</small>
        </el-footer>
      </el-container>
    </el-container>
  </fragment>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";
export default {
  name: "default-layout",
  components: {
    Header,
    Aside,
  },
};
</script>

<style></style>
