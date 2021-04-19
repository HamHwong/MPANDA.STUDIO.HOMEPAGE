<!--
 * @Author: your name
 * @Date: 2021-03-24 15:58:27
 * @LastEditTime: 2021-04-19 15:11:15
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
import { ref, onMounted, reactive, watch } from "vue";
import { GamePadFactory } from "./lib/load";
import { Player } from './lib/Sprints/models/Player'
import { useRoute } from 'vue-router';
export default {
  setup () {
    var GameBoardCanvas = ref(null);
    let GameManager = reactive({})
    onMounted(async () => {
      GameManager = GamePadFactory.getCanvasManager(GameBoardCanvas.value);

      await GameManager.init({
        width: 800,
        height: 500,
        debug: true,
        document:window.document
      })
      var player = new Player()
      GameManager.Player = player
      GameManager.addInstance(player)
      GameManager.start()
    });

    let route = useRoute()
    watch(route,()=>{
      console.log('change route')
      GameManager.WSManager.Close()
    })


    return {
      GameBoardCanvas,
      GameManager
    };
  }
};
</script>

<style>
</style>