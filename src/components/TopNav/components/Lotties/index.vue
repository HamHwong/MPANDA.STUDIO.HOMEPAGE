<template>
  <div class="warpper" >
    <div @click="switchStatus" class="container" ref="container"></div>
  </div>
</template>

<script>
import lottie from "lottie-web";
import { replaceColor ,getColors} from 'lottie-colorify';
import { onMounted, ref, reactive,watch} from "vue";
import {inject} from 'vue'
import animation from "@/assets/Lotties/menu.json";
export default {
  name: "Lotties",
  setup(props, context) {
    var container = ref(null);
    var lottieObj = ref(null);
    var isShownGB = inject("isShownBG");
    var options = reactive({
      status: "fold",
    });
    onMounted(function() {
      lottieObj = initAnimation(animation)
    });
    function initAnimation(animation){  
      return lottie.loadAnimation({
        container: container.value, // the dom element that will contain the animation
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: animation //animation, // the path to the animation json
      });
    }
    // watch(isShownGB,(val,oldval)=>{
    //   // lottieObj = initAnimation(replaceColor([51, 51, 51],[255,255,255], animation))
    //   // console.log(getColors(lottieObj))
    //   // animation.animationData = replaceColor([51, 51, 51],[255,255,255], animation)
    //   //replaceColor('#333333','#ffffff',animation)
    //   lottieObj.destroy()
    //     if(val){
    //       lottieObj=initAnimation(replaceColor('#333333','#ffffff',animation))
    //     }else{ 
    //       lottieObj=initAnimation(animation)
    //     }
    // })
    function goToAndStop(value, isFrame) {
      lottieObj.goToAndStop(value, isFrame);
    }
    function goToAndPlay(value, isFrame) {
      lottieObj.goToAndPlay(value, isFrame);
    }
    function fold() { 
      context.emit('menu:fold')
      options.status = 'fold' 
      lottieObj.playSegments([70, 140], true);
    }
    function unfold() { 
      context.emit('menu:unfold')
      options.status = 'unfold' 
      lottieObj.playSegments([0, 70], true);
    }
    function stop() {
      fold();
    }
    function play() {
      unfold();
    }
    function switchStatus() {      
      if (options.status == "fold") { 
        unfold();
      } else {
        fold();
      }
    }

    return {
      container,
      stop,
      play, 
      lottieObj,
      options,
      switchStatus,
      isShownGB
    };
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  background-color:rgba(255,255,255,0.3);
  border-radius:0 0 5px 0;
  overflow: hidden;
  .container {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}

</style>
