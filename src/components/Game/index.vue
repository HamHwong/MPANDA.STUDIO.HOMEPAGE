<!--
 * @Author: your name
 * @Date: 2021-03-24 15:58:27
 * @LastEditTime: 2021-04-03 20:53:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/index.vue
-->
<template>
  <div>
    <canvas ref="GameBoardCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCanvasManager,GamePadFactory } from "./lib/load";
import {Ball} from './lib/sprints/ball' 
export default {
  setup() {
    var GameBoardCanvas = ref(null); 
    onMounted(async () => {
      const GameManager = new GamePadFactory().getCanvasManager(GameBoardCanvas.value);
      
      await GameManager.init({
          width:800,
          height:500
      })
      GameManager.initKeyboardEvents(window.document)
      GameManager.addInstance(new Ball()) 
      GameManager.start()
    });
    return {
      GameBoardCanvas,
    };
  },
};
</script>

<style>
</style>