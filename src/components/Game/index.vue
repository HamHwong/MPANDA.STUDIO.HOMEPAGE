<!--
 * @Author: your name
 * @Date: 2021-03-24 15:58:27
 * @LastEditTime: 2021-04-17 22:09:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/index.vue
-->
<template>
  <div>
    <canvas ref="GameBoardCanvas" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { GamePadFactory } from "./lib/load";
import {Ball} from './lib/sprints/models/Ball/index.js' 
export default {
  setup() {
    var GameBoardCanvas = ref(null); 
    onMounted(async () => {
      const GameManager = GamePadFactory.getCanvasManager(GameBoardCanvas.value);
      
      await GameManager.init({
          width:800,
          height:500,
          debug:true
      })
      // GameManager.addInstance(new Ball()) 
      var player = new Ball() 
      GameManager.Player = player
      GameManager.addInstance(player) 
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