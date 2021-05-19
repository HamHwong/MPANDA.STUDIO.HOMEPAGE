<template>
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
    <slot name="default" />
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { inject, onMounted, watch } from '@vue/runtime-core'
import { Ext } from '@/api'
export default {
  setup() {
    onMounted(async () => {
      const { Data, IsSuccess } = await Ext.getDailyBG()
      if (IsSuccess) {
        if (Data.images.length > 0) {
          ImageObj.imgUrl = 'https://www.bing.com' + Data.images[0].url
        }
      }
    })
    var ImageObj = reactive({
      imgUrl: '',
    })
    var bgTextColor = ref('rgba(255, 255, 255, 0.900);')
    var bgClipStyle = ref(null)
    var isShowBG = inject('isShownBG')
    watch(isShowBG, function(shownBG) {
      if (shownBG) {
        bgTextColor.value = 'rgba(255, 255, 255, 0.900);'
        bgClipStyle.value = null
      } else {
        bgTextColor.value = 'transparent'
        bgClipStyle.value = 'text'
      }
    })
    function HandleBgTextSwitch() {
      isShowBG.value = !isShowBG.value
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
