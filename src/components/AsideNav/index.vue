<!--
 * @Author: your name
 * @Date: 2021-03-30 13:46:55
 * @LastEditTime: 2021-04-20 17:54:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/AsideNav/index.vue
-->
<template>
  <div>
    <el-drawer
      title="导航"
      :direction="direction"
      v-bind="$attrs"
    >
      <div class="myDrawer">
        <ul>
          <template
            v-for="(item,index) in routes"
          >
            <li
              v-if="!item.meta||(item.meta&&!item.meta.hidden)"
              :key="item"
              :class="{'aside_nav_item':true,'active':currentIndex===index}"
              @click="handleMenuItemClick(item,index)"
            >
              {{ item.name }}
            </li>
          </template>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { routes } from '@/router/routes'
import { ref } from 'vue'
import router from '@/router'
export default {
  setup (props, context) {
    var direction = ref('ltr')
    var currentIndex = ref(0)
    function handleMenuItemClick (item, index) {
      this.currentIndex = index 
      router.push({ 'path': item.path })
    }
    return {
      direction,
      currentIndex,
      handleMenuItemClick,
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
.myDrawer {
  color: #333;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      text-decoration: none;
      &.aside_nav_item {
        cursor: pointer;
        padding: 10px 5px;
        border-bottom: 1px solid #f0f0f0;
        &.active {
          background: #e0e0e0;
        }
      }
    }
  }
}
</style>