<template>
  <!-- <div 
    class="preload_bg"
  /> -->
  <div 
    class="text-context"
    :style="
      `
      background-image: url(${ImageObj.imgUrl});
      background-clip:${bgClipStyle};
      -webkit-background-clip:${bgClipStyle};
      color:${bgTextColor}
    `
    "
    @click="HandleBgTextSwitch()"
  >
    <slot />
  </div>
</template>

<script>
import { reactive, ref, toRef } from '@vue/reactivity'
import { computed, onMounted, watch } from '@vue/runtime-core'
import { Ext } from '@/api'
import store from '@/store'
export default {
  setup() {
    const hasLoaded = ref(false)
    onMounted(async () => {
      const { Data, IsSuccess } = await Ext.getDailyBG()
      if (IsSuccess) {
        if (Data.images.length > 0) {
          ImageObj.imgUrl = 'https://www.bing.com' + Data.images[0].url
          hasLoaded.value = true
        }
      }
    })
    var ImageObj = reactive({
      imgUrl: '',
    })
    var bgTextColor = ref('rgba(255, 255, 255, 0.900);')
    var bgClipStyle = ref(null)
    store.watch(()=>store.state.settings.isShownBG,
      function(shownBG) { 
        if (shownBG) {
          bgTextColor.value = 'rgba(255, 255, 255, 0.900);'
          bgClipStyle.value = null
        } else {
          bgTextColor.value = 'transparent'
          bgClipStyle.value = 'text'
        }
      } 
    )
    function HandleBgTextSwitch() { 
      if (store.getters.isShownBG) {
        store.dispatch('settings/hideBG')
      } else {
        store.dispatch('settings/showBG')
      }
    }
    return {
      ImageObj,
      bgTextColor,
      bgClipStyle,
      HandleBgTextSwitch,
    }
  },
}
</script>

<style lang="scss" scoped>
$fontSize_Desktop: 4rem;
$fontSize_Mobile: 2.5rem;
.preload_bg {
  height: 70px;
  width:100%;
  background: #00B4DB;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.text-context {
  transition: ALL 1s cubic-bezier(0.8, -0.5, 0.2, 1.4);
  min-height: 70px;
  padding: 80px 20px 0 20px;
  position: relative;
  user-select: none;
  text-align: left;
  font-size: $fontSize_Mobile;
  line-height: $fontSize_Mobile;
  font-weight: 800;
  text-transform: uppercase;
  background-position-x: 0;
  background-position-y: 0;
  @media (min-width: 600px) {
    background-position-y: -25vh;
    font-size: $fontSize_Desktop;
    line-height: $fontSize_Desktop;
  }
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
