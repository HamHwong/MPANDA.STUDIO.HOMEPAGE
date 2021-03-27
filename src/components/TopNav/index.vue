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
      <div
        class="Nav_Menus"
        ref="Nav_Manus_Ref"
      >
        <div
          class="Nav_Menus_Marker"
          :style="`
          width: ${markerLinePosition.width}px;
          left: ${markerLinePosition.left}px;
          background-color:${isShownGB ? '#fff' : 'rgb(29, 32, 41);'}
          `"
        ></div>
        <!-- -Nav_Manus_Options[CurrentIndex].menusHeight -->
        <div
          v-for="(menu, i) in Nav_Manus"
          @mouseover="focusMenu(i)"
          class="Nav_Menu"
        >

          <template v-if="menu.children.length > 0">
            <div class="Nav_Menu_Label">{{ menu.label }}</div>
            <div
              class="Sub_Nav_Menus"
              :style="`margin-top:${CurrentIndex.val===i?0:-100}px;opacity:${CurrentIndex.val===i?1:0}`"
            >
              <div
                v-for="submenu in menu.children"
                class="Sub_Nav_Menu"
              >
                <div class="Sub_Nav_Menus_Label">
                  {{ submenu.label }}
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="Nav_Menu_Label">
              {{ menu.label }}
            </div>
          </template>
        </div>
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
      validator (val) {
        return ["top", "bottom", "left", "right"].includes(val.toLowerCase());
      },
    },
  },
  setup: (props, context) => {
    var CurrentIndex = reactive({ val: -1 })
    var isShownGB = inject("isShownBG");
    var markerLinePosition = reactive({
      left: 10,
      width: 10,
    });
    var Nav_Manus_Ref = ref(null);
    var Nav_Manus_Options = reactive([]);

    function initManusPosition () {
      var Menus = Nav_Manus_Ref.value.querySelectorAll(".Nav_Menu");
      for (var i = 0; i < Menus.length; i++) {
        Nav_Manus_Options.push({
          width: Menus[i].offsetWidth,
          left: Menus[i].offsetLeft,
          menusHeight: Menus[i].offsetHeight
        });
      }
    }

    function focusMenu (index) {
      markerLinePosition.width = Nav_Manus_Options[index].width;
      markerLinePosition.left = Nav_Manus_Options[index].left;
      CurrentIndex.val = index;
      console.log(CurrentIndex)
    }
    function blurMenu () {
      markerLinePosition.width = 0;
      markerLinePosition.left = 0;
      CurrentIndex.val = -1
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
      markerLinePosition,
      isShownGB,
      Nav_Manus_Ref,
      Nav_Manus,
      focusMenu,
      blurMenu,
      Nav_Manus_Options,
      CurrentIndex
    };
  },
};
</script>
<style lang="scss" scoped>
$animation-cubic-bezier: cubic-bezier(0.8, -0.5, 0.2, 1.4);
$animation-duration: 1s;
.Nav_Bar {
  width: 100%;
  position: absolute;
  display: flex;
  // flex-direction: row-reverse;
  top: 0;
  left: 0;
  z-index: 10000;
  color: #fff;
  transition: color 1s $animation-cubic-bezier;
  &.Dark {
    color: rgb(29, 32, 41);
  }
  .Nav_Menus {
    margin: 0px 20px;
    position: relative;
    user-select: none;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    .Nav_Menus_Marker {
      transition: left 0.8s ease-in-out, width 1.2s $animation-cubic-bezier;
      height: 2px;
      position: absolute;
    }
    .Nav_Menu {
      cursor: pointer;
      .Nav_Menu_Label {
        padding: 10px 10px;
      }
      .Sub_Nav_Menus {
        transition: opacity .8s $animation-cubic-bezier,
          margin-top 1s $animation-cubic-bezier;
        cursor: inherit;
        .Sub_Nav_Menus_Label {
          padding: 5px 10px;
          border-radius: 5px;
          box-sizing: border-box;
          transition: background 0.5s $animation-cubic-bezier;
          &:hover {
            background-color: rgba(51, 51, 51, 0.2);
            margin-bottom: -2px;
            border-bottom: 2px solid #fff;
          }
        }
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