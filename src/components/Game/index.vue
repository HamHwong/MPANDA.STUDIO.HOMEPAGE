<!--
 * @Author: your name
 * @Date: 2021-03-24 15:58:27
 * @LastEditTime: 2021-03-25 14:56:20
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
export default {
  setup() {
    var GameBoardCanvas = ref(null); 
    onMounted(() => {
      const GameManager = new GamePadFactory().getCanvasManager(GameBoardCanvas.value);
      GameManager.init({
          width:800,
          height:500
      }).initKeyboardEvents(window.document)
    });
    return {
      GameBoardCanvas,
    };
  },
};
</script>

<style>
</style>