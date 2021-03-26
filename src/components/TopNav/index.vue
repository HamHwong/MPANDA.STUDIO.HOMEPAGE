<!--
 * @Author: your name
 * @Date: 2021-03-25 16:32:01
 * @LastEditTime: 2021-03-26 16:24:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-topnav/index.vue
-->
<template>
  <div>
    <div
      @mouseleave="blurMenu"
      :class="{ Nav_Bar: true, DarkMode: false, Dark: !isShownGB }"
    >
      <div class="Nav_Menus" ref="Nav_Manus_Ref">
        <div
          class="Nav_Menus_Marker"
          :style="`width: ${markerPosition.width}px;left: ${
            markerPosition.left
          }px;background-color:${isShownGB ? '#fff' : '#333'}`"
        ></div>

        <div
          v-for="(menu, i) in Nav_Manus"
          @mouseover="focusMenu(i)"
          class="Nav_Menu"
        >
          <template v-if="menu.children.length > 0">
            <div class="Sub_Nav_Menus_Label">{{ menu.label }}</div>
            <div class="Sub_Nav_Menus">
              <div v-for="submenu in menu.children" class="Sub_Nav_Menu">
                {{ submenu.label }}
              </div>
            </div>
          </template>
          <template v-else>
            {{ menu.label }}
          </template>
        </div>
        <!-- <div class="Nav_Menu">
          Menu
          <div class="Sub_Nav_Menus">
            <div class="Sub_Nav_Menu">SubMenu</div>
          </div> 
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, reactive, onMounted } from "vue";
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
    var isShownGB = inject("isShownBG");
    var markerPosition = reactive({
      left: 10,
      width: 10,
    });
    var Nav_Manus_Ref = ref(null);
    var Nav_Manus_Options = reactive([]);

    function initManusPosition() {
      var Menus = Nav_Manus_Ref.value.querySelectorAll(".Nav_Menu");
      for (var i = 0; i < Menus.length; i++) {
        Nav_Manus_Options.push({
          width: Menus[i].offsetWidth,
          left: Menus[i].offsetLeft,
        });
      }
    }

    function focusMenu(index) {
      markerPosition.width = Nav_Manus_Options[index].width;
      markerPosition.left = Nav_Manus_Options[index].left;
    }
    function blurMenu() {
      markerPosition.width = 0;
      markerPosition.left = 0;
    }

    var Nav_Manus = reactive([]);
    Nav_Manus = [
      {
        name: "",
        label: "Menu1",
        path: "",
        children: [
          {
            name: "",
            label: "Long Menu Label",
            path: "",
            children: [],
          },
          {
            name: "",
            label: "Menu3",
            path: "",
            children: [],
          },
        ],
      },
      {
        name: "",
        label: "Long Menu Label",
        path: "",
        children: [],
      },
      {
        name: "",
        label: "Menu3",
        path: "",
        children: [],
      },
    ];

    onMounted(() => {
      initManusPosition();
    });
    return {
      markerPosition,
      isShownGB,
      Nav_Manus_Ref,
      Nav_Manus,
      focusMenu,
      blurMenu,
    };
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
  &.Dark {
    color: #333;
  }
  .Nav_Menus {
    margin: 0px 20px;
    position: relative;
    user-select: none;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    .Nav_Menus_Marker {
      transition: left 0.8s ease-in-out,
        width 1.2s cubic-bezier(0.8, -0.5, 0.2, 1.4);
      height: 2px;
      background-color: red;
      position: absolute;
    }
    .Nav_Menu {
      cursor: pointer;
      padding: 10px 10px;
      .Sub_Nav_Menus {
        cursor: inherit;
        .Sub_Nav_Menu {
          cursor: inherit;
        }
      }
    }
  }
  &.DarkMode {
    .Nav_Menus {
      .Nav_Menu {
        .Sub_Nav_Menus {
          .Sub_Nav_Menu {
          }
        }
      }
    }
  }
}
</style>