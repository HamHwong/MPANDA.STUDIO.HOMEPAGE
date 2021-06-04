<!--
 * @Author: your name
 * @Date: 2021-01-20 16:31:13
 * @LastEditTime: 2021-02-20 15:38:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-card/mp-card-button/index.vue
-->
<template>
  <div
    :ref="setRef"
    class="mp-card-button-warpper"
    @click="
      () => {
        if (trigger === 'click') collapse = !collapse;
      }
    "
    @mouseover="
      () => {
        if (trigger === 'hover' && !collapse) collapse = true;
      }
    "
    @mouseout="
      () => {
        if (trigger === 'hover' && collapse) collapse = false;
      }
    "
  >
    <div :class="classOptions">
      <i class="el-icon-arrow-up" />
    </div>
    <div
      :class="{ 'mp-card-button-reference': true, collapse: collapse }"
      :style="referencePositionOptions"
    >
      <div class="mp-card-button-reference-wrapper">
        <slot name="reference" />
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
  name: "MpCardButton",
  inject: ["cardType"],
  props: {
    position: {
      type: String,
      default: () => "top-right",
    },
    trigger: {
      type: String,
      default: () => "click",
      validator: (val) => {
        return ["click", "hover"].indexOf(val) !== -1;
      },
    },
  },
  setup() {
    let myRef = "";
    const setRef = (el) => {
      myRef = el;
    };
    nextTick(() => {
      // 调整下拉菜单位置
      var offset = 3;
      var dom = myRef.querySelector(".mp-card-button-reference");
      // var width = dom.offsetWidth;
      dom.style.right = 0 - 0 + "px";
      var btndom = myRef.querySelector(".mp-card-button");
      dom.style.top = btndom.offsetHeight + offset + "px";
    });
    return {
      setRef,
    };
  },
  data() {
    return {
      collapse: false,
    };
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
    referencePositionOptions: {
      get() { 
        return {
          // left:'-100px'
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.mp-card-button-warpper {
  // position: absolute;
  // right: 0;
  // top: 0;
  min-height:30px;
  min-width:30px;
  // display: flex;
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
    *{
      pointer-events: none;
    }
  }
  .mp-card-button-reference {
    font-size: 12px;
    // background-color: #333;
    position: absolute;
    transition: max-height 0.5s ease-in-out;
    max-height: 0px;
    overflow: hidden;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    border-radius: 5px; 
    min-width: 100px;
    background-color: #fff;
    box-shadow: 0 0 5px 0px rgb(196, 196, 196); 
    &:deep(.mp-card-button-reference-wrapper){
      a{
        &:link,&:active,&:visited,&:hover{
          text-decoration: none;
          color: rgb(100, 100, 100);
        }
      }
      > *{
        display: block;
        // padding: 5px 0px;
        margin:0 5px;
        box-sizing: border-box;
        &:not(:last-child){
          border-bottom: 1px solid rgb(236, 236, 236);
        }
        &:hover{
          background-color: rgb(247, 247, 247);
        }
      }
    }
    &.collapse {
      max-height: 800px;
    }
  }
}
</style>
