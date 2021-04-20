<!--
 * @Author: your name
 * @Date: 2021-04-20 13:56:04
 * @LastEditTime: 2021-04-20 15:23:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/mp-rank/index.vue
-->
<template>
  <div>
    <MPCard
      v-bind="$attrs"
      min-height="200px"
    />
  </div>
</template>

<script>
import MPCard from '@/components/mp-card'
export default {
  setup(){
    return {MPCard}
  }
}
</script>

<style>

</style>