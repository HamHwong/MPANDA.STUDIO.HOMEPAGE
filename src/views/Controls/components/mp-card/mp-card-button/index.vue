<!--
 * @Author: your name
 * @Date: 2021-01-20 16:31:13
 * @LastEditTime: 2021-01-20 17:31:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-card/mp-card-button/index.vue
-->
<template>
  <div :class="classOptions">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>

<script>
export default {
  name: "mp-card-button",
  inject:['cardType'],
  props: {
    position: {
      type: String,
      default: () => "top-right",
    }, 
  },
  computed: {
    classOptions: {
      get() {
        var obj = {
          "mp-card-button": true,
          position: this.position ? true : false,
        };
        obj[this.cardType] = true;
        return obj;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.mp-card-button {
  min-height: 30px;
  min-width: 30px;
  border-radius: 8px;
  font-size: 12px; 
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  cursor: pointer;
  &.position {
    position: absolute;
    top: 0;
    right: 0;
  }
  &.default {
    background-color: #f7f8fc;
    color: #8b8b8b;
  }
  &.primary {
    background-color: #f7f8fc;
    color: #4c9efe;
  }
  &.dark {
    background-color: #373838;
    color: #fff;
  }
  &.danger {
    background-color: #f07aa5;
    color: #fff;
  }
  &.success {
    background-color: #31b8b8;
    color: #fff;
  }
}
</style>
