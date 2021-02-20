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
    class="mp-card-button-warpper"
    :ref="setRef"
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
      <slot name="reference" />
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
  name: "mp-card-button",
  inject: ["cardType"],
  setup() {
    let myRef = "";
    const setRef = (el) => {
      myRef = el;
    };
    nextTick(() => {
      // 调整下拉菜单位置
      var offset = 3;
      var dom = myRef.querySelector(".mp-card-button-reference");
      var width = dom.offsetWidth;
      dom.style.left = 0 - width + "px";
      var btndom = myRef.querySelector(".mp-card-button");
      dom.style.top = btndom.offsetHeight + offset + "px";
    });
    return {
      setRef,
    };
  },
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
        console.log(this.$refs);
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
  position: absolute;
  right: 0;
  top: 0;
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
  }
  .mp-card-button-reference {
    font-size: 12px;
    // background-color: #333;
    position: absolute;
    transition: max-height 0.5s ease-in-out;
    max-height: 0px;
    overflow: hidden;
    z-index: 1000;
    &.collapse {
      max-height: 800px;
    }
  }
}
</style>
