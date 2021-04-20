<!--
 * @Author: your name
 * @Date: 2021-03-30 13:46:55
 * @LastEditTime: 2021-04-20 16:47:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/AsideNav/index.vue
-->
<template>
  <div>
    <el-drawer
      title="我是标题"
      :direction="direction"
      v-bind="$attrs"
    >
      <div class="myDrawer">
        <ul>
          <li>
            <a href="#">a</a>
          </li>
        </ul>
        <span>我来啦!</span>
      </div>
      <el-drawer
        v-model="innerDrawer"
        title="我是里面的" 
        :append-to-body="true"
        size="95%"
      >
        <p>_(:зゝ∠)_</p>
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import { routes } from '@/router/routes'
import { inject, ref } from 'vue'
export default {
  setup (props, context) {
    var direction = ref('ltr')
    var innerDrawer = ref(false)
    return {
      direction,
      innerDrawer,
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
.myDrawer {
  ul {
    list-style: none;
    li {
      text-decoration: none;
    }
  }
}
</style>