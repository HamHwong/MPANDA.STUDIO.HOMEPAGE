<!--
 * @Author: your name
 * @Date: 2021-03-01 11:09:51
 * @LastEditTime: 2021-03-01 11:11:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Header/index.vue
-->
<template>
  <div>
    <el-header style="box-shadow: #afb1b3 0 0 20px">
      <div class="header-warpper">
        <!-- <div>
              Welcome To MPanda.Studio
            </div> -->
        <el-tooltip
          class="item"
          :manual="manual"
          v-model="showSlogen"
          effect="dark"
          content="Welcome To MPanda.Studio"
          placement="left"
        >
          <img
            style="width: 40px; height: 40px; margin-left: 10px"
            :src="require('@/static/logo.png')"
          />
        </el-tooltip>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSlogen: false,
      manual: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showSlogen = true;
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>
.header-warpper {
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
}
</style>