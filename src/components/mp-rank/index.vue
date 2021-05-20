<!--
 * @Author: your name
 * @Date: 2021-04-20 13:56:04
 * @LastEditTime: 2021-05-05 15:50:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/mp-rank/index.vue
-->
<template>
  <div style="text-align:left;">
    <MPCard
      v-bind="$attrs" 
      min-height="200px"
    >
      <template #header>
        <slot name="header" />
      </template>
      <slot name="default" />
    </MPCard>
  </div>
</template>

<script>
import MPCard from '@/components/mp-card'
export default {
  setup(props,context) {
    return { MPCard }
  },
}
</script>

<style></style>
