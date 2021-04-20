<!--
 * @Author: your name
 * @Date: 2021-01-20 13:22:20
 * @LastEditTime: 2021-02-20 14:04:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-card/index.vue
-->
<template>
  <div :class="typeClass">
    <h1 class="mp-card-header">
      <slot name="header" />
    </h1>
    <div
      class="mp-card-content"
      :style="{
        maxHeight: maxHeight,
        minHeight: minHeight,
        height:height,
      }"
    >
      <el-scrollbar style="height:100%">
        <slot name="default" />
      </el-scrollbar>
    </div>
    <div class="mp-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => "default",
    },
    maxHeight: {
      type: String,
      default: "",
    },
    minHeight: {
      type: String,
      default: () => "",
    },
    height: {
      type: String,
      default: () => "",
    },
  },
  provide:function(){
      return {
          cardType:this.type
      }
  },
  computed: {
    typeClass: {
      get() {
        var obj = {
          "mp-card-warpper": true,
        };
        obj[this.type] = true;
        return obj;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.mp-card-warpper {
  position: relative;
  border-radius: 15px;
  box-shadow: 0 0 30px 5px #f0f2ff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  transition: 0.3s box-shadow ease-in-out;
  margin-bottom: 10px;
  // overflow: hidden;
  box-sizing: border-box;
  &.default {
    background: #fff;
    &:hover {
      box-shadow: 0 0 15px #d9dbe9;
    }
  }
  &.primary {
    background: #4c9efe;
    color: #fff;
    &:hover {
      box-shadow: 0 0 15px #d9dbe9;
    } 
  }
  &.dark {
    background: #181d23;
    color: #adcce6;
    &:hover {
      box-shadow: 0 0 15px #d9dbe9;
    }
  }
  &.danger {
    background: #ea5e91;
    color: #ffffff;
    &:hover {
      box-shadow: 0 0 15px #d9dbe9;
    }
  }
  &.success {
    background: #1eaaab;
    color: #ffffff;
    &:hover {
      box-shadow: 0 0 15px #d9dbe9;
    }
  }
  .mp-card-content{
    //   background-color: #fff;
    margin:0 -10px -10px -10px ;
    padding: 0px 15px;
  }
}
h1{
  &.mp-card-header {
      display: flex;
      justify-content: center;
      position: relative;
      margin: 0; 
      line-height: 30px;
  }
}

.mp-card-footer {
  position: relative;
  bottom: -10px;
  left: 0;
  width: 100%;
} 
</style>