<template>
  <div>
    <div class="wrapper">
      {{ userDisplayName }}
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { computed } from '@vue/runtime-core'
export default {
  setup(){
    return {
      userDisplayName:computed(()=>store.getters.userDisplayName) 
    }
  }
}
</script>

<style lang="scss">

</style>