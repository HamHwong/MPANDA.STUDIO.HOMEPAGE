<!--
 * @Author: your name
 * @Date: 2021-03-25 16:32:01
 * @LastEditTime: 2021-03-25 18:02:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-topnav/index.vue
-->
<template>
  <div>
    <div :class="{ Nav_Bar: true, DarkMode: false ,Dark:!isShownGB}"> 
      <div class="Nav_Menus">
        <div class="Nav_Menu">Menu</div>
        <div class="Nav_Menu">
          Menu
          <div class="Sub_Nav_Menu">SubMenu</div>
          <div class="Sub_Nav_Menu">SubMenu</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref,inject} from 'vue'
export default {
  name: "topNav",
  props: {
    fixed: {
      type: String,
      validator(val) {
        return ["top", "bottom", "left", "right"].includes(val.toLowerCase());
      },
    },
  },
  setup: (props, context) => { 
    var isShownGB = inject('isShownBG')
    return {isShownGB}
  },
};
</script>
<style lang="scss" scoped>
.Nav_Bar {
  width: 100%;
  position: absolute;
  display: flex;
  // flex-direction: row-reverse;
  top: 0;
  left: 0;
  z-index: 10000;
  color: #fff;
  transition: color 1s cubic-bezier(0.8, -0.5, 0.2, 1.4);
  &.Dark{
    color: #333;
  }
  .Nav_Menus {
    margin: 10px 20px;
    position:relative;
    &::after{
      content: '';
      width: 10px;
      height: 2px;
      background-color: red;
      position:absolute;
      left: 0;
    }
    display: flex;
    flex-direction: row;
    .Nav_Menu {
      .Sub_Nav_Menu {
      }
    }
  }
  &.DarkMode {
    .Nav_Menus {
      .Nav_Menu {
        .Sub_Nav_Menu {
        }
      }
    }
  }
}
</style>