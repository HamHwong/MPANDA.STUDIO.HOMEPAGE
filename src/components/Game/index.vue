<!--
 * @Author: your name
 * @Date: 2021-03-24 15:58:27
 * @LastEditTime: 2021-04-20 18:00:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/index.vue
-->
<template>
  <div>
    <canvas ref="GameBoardCanvas" />
    <el-button @click="handleUpdate">
      更新数据
    </el-button>
  </div>
</template>

<script>
import { ref, onMounted, reactive, watch, onDeactivated, onUnmounted } from "vue";
import { GamePadFactory } from "./lib/load";
import { Player } from './lib/Sprints/models/Player'
import { useRoute } from 'vue-router';
export default {
  setup () {
    var GameBoardCanvas = ref(null);
    let GameManager = reactive({})
    onMounted(async () => {
      console.log('onMounted')
      GameManager = GamePadFactory.getCanvasManager(GameBoardCanvas.value);

      await GameManager.init({
        height: 300,
        debug: false,
        document: window.document
      })
      var player = new Player()
      GameManager.Player = player
      GameManager.addInstance(player)
      GameManager.start()
    });

    onUnmounted(() => {
      console.log('onUnmounted')
      GamePadFactory.CanvasManager = null
    })
    let route = useRoute()
    watch(route, () => {
      GameManager.drop()
    })

    function handleUpdate () {
      GameManager.AssetsManager.dropDB()
      location.reload()
    }
    return {
      GameBoardCanvas,
      GameManager,
      handleUpdate
    };
  }
};
</script>

<style>
</style>