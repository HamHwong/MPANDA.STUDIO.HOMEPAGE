<template>
  <div class="warpper">
    <div
      ref="container"
      class="container"
      @click="switchStatus"
    />
  </div>
</template>

<script>
import lottie from 'lottie-web'
// import { replaceColor ,getColors} from 'lottie-colorify';
import { onMounted, ref, reactive, watch, computed } from 'vue'
import lottieApi from 'lottie-api'
import store from '@/store' 
import animation from '@/assets/Lotties/menu.json'
export default {
  name: 'Lotties',
  props: {
    isUnfold: {
      type: Boolean,
      default: () => false,
    },
    isShownBG:{
      type:Boolean,
      default:()=>true
    }
  },
  setup(props, context) {
    var container = ref(null)
    var lottieObj = ref(null) 
    var options = reactive({
      status: 'fold',
    })
    onMounted(function() {
      lottieObj = initAnimation(animation)
      changeColor([1, 1, 1, 1])
    })
    function initAnimation(animation) {
      return lottie.loadAnimation({
        container: container.value, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animation, //animation, // the path to the animation json
      })
    } 

    watch(()=>props.isShownBG, (shownBG) => {
      if (shownBG) {
        changeColor([1, 1, 1, 1])
      } else {
        changeColor([0, 0, 0, 1])
      }
    })

    function changeColor([r, g, b, a]) {
      const api = lottieApi.createAnimationApi(lottieObj)
      var arr = ['Upper', 'Center', 'Buttom']
      arr.map((i) => {
        const element = api.getKeyPath(`Contents,${i},Fill 1,Color`)
        api.addValueCallback(element, function() {
          return [r, g, b, a]
        })
      })
      var curFrame = 0
      if (options.status == 'fold') {
        curFrame = 0 + Math.random() * 0.00001
        // lottieObj.goToAndStop(curFrame,false)
        lottieObj.playSegments([0, 1], true)
      } else {
        curFrame = 70 + Math.random() * 0.00001
        // lottieObj.goToAndStop(curFrame,false)
        lottieObj.playSegments([69, 70], true)
      }
    }

    // function goToAndStop(val, isFrame) {
    //   lottieObj.goToAndStop(val, isFrame)
    // }

    // function goToAndPlay(val, isFrame) {
    //   lottieObj.goToAndPlay(val, isFrame)
    // }
    
    function fold() {
      context.emit('menu:fold')
    }
    function unfold() {
      context.emit('menu:unfold')
    }
    watch(()=>props.isUnfold, (isUnfold) => { 
      if (isUnfold) {
        // unfold()
        options.status = 'unfold'
        lottieObj.playSegments([0, 70], false)
        context.emit('update:value', true)
      } else {
        // fold()
        options.status = 'fold'
        lottieObj.playSegments([70, 140], false)
        context.emit('update:value', false)
      }
    })
    function stop() {
      fold()
    }
    function play() {
      unfold()
    }
    function switchStatus() {
      if (options.status == 'fold') {
        unfold()
      } else {
        fold()
      }
    }

    return {
      container,
      stop,
      play,
      lottieObj,
      options,
      switchStatus,
    }
  },
}
</script>

<style lang="scss" scoped>
.warpper {
  // background-color:rgba(255,255,255,0.3);
  // border-radius:0 0 5px 0;
  overflow: hidden;
  .container {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}
</style>
