<!--
 * @Author: your name
 * @Date: 2021-03-24 15:58:27
 * @LastEditTime: 2021-04-25 16:17:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/index.vue
-->
<template>
  <div>
    <canvas ref="GameBoardCanvas" />
    <el-row>
      <el-col>
        <el-button @click="handleUpdate">
          更新数据
        </el-button>
      </el-col>
      <el-col>
        <el-input
          v-model="words"
          @focus="handlePauseControls"
          @blur="handleResumeControls"
        >
          <template #append>
            <el-button @click="speak">
              说话
            </el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted, reactive, watch, onUnmounted } from "vue";
import { GamePadFactory } from "./lib/load";
import { Player } from './lib/sprints/models/Player'
import { IMap } from './lib/sprints/Imodels/IMap'
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
        width:600,
        debug: false,
        document: window.document
      })
      var player = new Player()
      player.x = 0
      player.y = 200
      GameManager.Player = player
      GameManager.addInstance(player)
      var map = new IMap()

      map.w = 1000
      map.h = 600
      map.x = 0
      map.y = 0
      GameManager.loadMap(map)
      GameManager.start()
    });

    onUnmounted(() => {
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
    var words = ref('')
    function handlePauseControls(){
      GameManager.PauseControls = true
    }
    
    function handleResumeControls(){
      GameManager.PauseControls = false
    }
    function speak(){
      // console.log(words.value)
      if(words.value&&words.value!=='')
      GameManager.Player.SaySomeThing = words.value
      words.value = ''
    }
    return {
      GameBoardCanvas,
      GameManager,
      handleUpdate,
      words,
      handlePauseControls,
      handleResumeControls,
      speak
    };
  }
};
</script>

<style>
</style>