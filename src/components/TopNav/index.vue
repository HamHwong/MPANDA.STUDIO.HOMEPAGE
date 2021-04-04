<!--
 * @Author: your name
 * @Date: 2021-03-25 16:32:01
 * @LastEditTime: 2021-04-04 23:30:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-topnav/index.vue
-->
<template>
  <div>
    <div
      :class="{
        Nav_Bar: true,
        DarkMode: false,
        Dark: !isShownGB,
        Fold: !IsUnfold,
      }"
      @mouseleave="blurMenu"
    >
      <Lotties
        v-model:value="IsUnfold"
        @menu:fold="handleMenuUnFold(false)"
        @menu:unfold="handleMenuUnFold(true)"
      />
      <div
        v-if="!isMobile()"
        class="Nav_Menus_Warp"
      >
        <div
          ref="Nav_Manus_Ref"
          class="Nav_Menus"
        >
          <div
            class="Nav_Menus_Marker"
            :style="
              `
            width: ${markerLinePosition.width}px;
            left: ${markerLinePosition.left}px;
            background-color:${isShownGB ? '#fff' : 'rgb(29, 32, 41);'}
            `
            "
          />
          <template
            v-for="(menu, i) in Nav_Manus"
            :key="menu.name"
          >
            <!-- {{ Nav_Manus[i] }} -->
            <div
              v-if="isCurrentPage(menu)"
              class="Nav_Menu"
              @mouseover="focusMenu(i)"
            >
              <template v-if="menu.children && menu.children.length > 0">
                <div class="Nav_Menu_Label">
                  {{ menu.name }}
                </div>
                <div
                  class="Sub_Nav_Menus"
                  :style="
                    `margin-top:${
                      CurrentIndex.val === i ? 0 : -100
                    }px;opacity:${CurrentIndex.val === i ? 1 : 0}`
                  "
                >
                  <div
                    v-for="submenu in menu.children"
                    class="Sub_Nav_Menu"
                  >
                    <div
                      class="Sub_Nav_Menus_Label"
                      @click="To(submenu)"
                    >
                      {{ submenu.label }}
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div
                  class="Nav_Menu_Label"
                  @click="To(menu)"
                >
                  {{ menu.name }}
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
      <AsideNav
        v-else
        v-model="IsUnfold"
        size="70%"
        :before-close="() => (IsUnfold = false)"
      />
    </div>
  </div>
</template>

<script>
import { ref, inject, reactive, onMounted } from 'vue'
import AsideNav from '@/components/AsideNav'
import Lotties from './components/Lotties'
import isMobile from 'is-mobile'
import { routes } from '@/router/routes'
import { useRouter } from 'vue-router'

// import * as animationData from '@/assets/Lotties/menu.json';
export default {
  name: 'TopNav',
  components: {
    Lotties,
    AsideNav,
  },
  props: {
    fixed: {
      type: String,
      validator(val) {
        return ['top', 'bottom', 'left', 'right'].includes(val.toLowerCase())
      },
    },
  },
  setup: (props, context) => {
    var CurrentIndex = reactive({ val: -1 })
    var isShownGB = inject('isShownBG')
    var IsUnfold = ref(false)
    var markerLinePosition = reactive({
      left: 0,
      width: 0,
    })
    var Nav_Manus_Ref = ref(null)
    var Nav_Manus_Options = reactive([])
    function initManusPosition() {
      var Menus = Nav_Manus_Ref.value.querySelectorAll('.Nav_Menu')
      for (var i = 0; i < Menus.length; i++) {
        Nav_Manus_Options.push({
          width: Menus[i].offsetWidth,
          left: Menus[i].offsetLeft,
          menusHeight: Menus[i].offsetHeight,
        })
      }
      // Nav_Manus_Options = Nav_Manus_Options.filter(menu=>isCurrentPage(menu))
    }

    function focusMenu(index) {
      markerLinePosition.width = Nav_Manus_Options[index].width
      markerLinePosition.left = Nav_Manus_Options[index].left
      CurrentIndex.val = index
    }
    function blurMenu() {
      markerLinePosition.width = 0
      markerLinePosition.left = 0
      CurrentIndex.val = -1
    }
    function To(menu) {
      this.$router.push({ path: menu.path })
    } 
    var Nav_Manus = routes.filter((item) => isCurrentPage(item))
    onMounted(() => {
      !isMobile() && initManusPosition()
    })

    function handleMenuUnFold(status) {
      IsUnfold.value = status
    }

    function isCurrentPage(route) {
      var pageLimit = route.meta && route.meta.page ? route.meta.page : null
      if (!pageLimit) return false
      var currentRouteName = useRouter().currentRoute.value.name
      if (pageLimit instanceof Array) {
        return pageLimit.includes(currentRouteName)
      }
      return pageLimit === currentRouteName
    }
    return {
      markerLinePosition,
      isShownGB,
      Nav_Manus_Ref,
      Nav_Manus,
      focusMenu,
      blurMenu,
      Nav_Manus_Options,
      CurrentIndex,
      handleMenuUnFold,
      IsUnfold,
      isMobile,
      isCurrentPage,
      To,
      // routes
    }
  },
}
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
  overflow: hidden;
  &.Dark {
    color: rgb(29, 32, 41);
  }

  &.Fold {
    .Nav_Menus_Warp {
      .Nav_Menus {
        left: -100vw;
      }
    }
  }
  .Nav_Menus_Warp {
    margin: 0px 20px;
    user-select: none;
    position: relative;
    overflow: hidden;
    .Nav_Menus {
      position: relative;
      left: 0;
      display: flex;
      align-items: flex-start;
      flex-direction: row;
      transition: left 1.5s $animation-cubic-bezier;
      .Nav_Menus_Marker {
        transition: left 0.8s ease-in-out, width 1.2s $animation-cubic-bezier;
        height: 2px;
        position: absolute;
      }
      .Nav_Menu {
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: normal;
        padding: 10px 10px;
        .Sub_Nav_Menus {
          transition: opacity 0.8s $animation-cubic-bezier,
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
            font-weight: normal;
            font-size: 0.5rem;
            cursor: inherit;
          }
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
