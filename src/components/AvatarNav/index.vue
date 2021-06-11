<template>
  <div>
    <el-dropdown
      :disabled="!hasLogin"
      size="small"
      :hide-timeout="500"
      @command="handleCommand" 
    >
      <div
        class="wrapper"
        :class="{isShownBG}"
      >
        <div
          class="inner_wrapper"
          @click="handleBtnClick"
        >
          <el-avatar
            :class="{
              avatar_btn: true,
              on_logging_in: hasLogin,
            }"
            shape="circle"
            size="large"
            :src="squareUrl"
          />
          <span :class="{user_name:true,on_logging_in:hasLogin}"> 
            <small>{{ userDisplayName || `Guest` }}</small>
          </span>
        </div> 
      </div>
      <template 
        #dropdown
      >
        <el-dropdown-menu>
          <el-dropdown-item> 
            <div class="bg_setting_switch">
              背景{{ isShownBG }}
              <el-switch
                :value="isShownBG"
                style="display: block" 
                active-text="显示"
                inactive-text="不显示"
                @click="handleBGSwitch"
              />
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="game_enable_switch">
              游戏
              <el-switch
                :value="isShowGame"
                style="display: block" 
                active-text="启用"
                inactive-text="不启用"
                @click="handleGameSwitch"
              />
            </div>
          </el-dropdown-item> 
          <el-dropdown-item
            command="exit"
            divided
            icon="el-icon-wind-power"
          >
            登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import store from '@/store'
import { computed, ref, watch } from '@vue/runtime-core'
import login from '@/views/Login'
import { ElNotification as $notify } from 'element-plus'
import {logout} from '@/compositionAPI/logout'
export default {
  setup() {
    const squareUrl = ref(
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    )

    const hasLogin = computed(() => store.getters.hasLogin) 
    const isShownBG = computed(()=> store.state.settings.isShownBG)
    const isShowGame = computed(()=> store.state.settings.isShowGame)
    function handleBtnClick() {
      if (!hasLogin.value) {
        store.dispatch('settings/showLogin')
      }
    }
    async function handleLogout(){
        await logout()
        $notify({
                title: '已经登出',
                message: '期待您的下次光临!',
                type: 'success',
                position: 'bottom-right'
              })
    }
    // console.log('store.getters.isShownBG',store.getters.isShownBG)
    function handleBGSwitch(){ 
      if(isShownBG.value){
        store.dispatch('settings/hideBG')
      }else{
        store.dispatch('settings/showBG')
      }
    }
    function handleGameSwitch(){ 
      if(isShowGame.value){
        store.dispatch('game/stop')
      }else{
        store.dispatch('game/start')
      }
    }
    function handleCommand(command){
      switch(command){
        case 'exit':
          handleLogout();
          break;
        default: break;
      }
    }
    return {
      userDisplayName: computed(() => store.getters.userDisplayName),
      squareUrl,
      handleBtnClick,
      hasLogin, 
      isShownBG,
      isShowGame,
      login,
      handleCommand,
      handleBGSwitch,
      handleGameSwitch
    }
  },
}
</script>

<style lang="scss" scoped>
$avatar-width:120px;
$avatar-height:40px;
$avatar-border:4px;
.wrapper {
  color: #333;
  width: $avatar-width;
  height:$avatar-height;
  overflow: hidden;
  margin: 10px;
  border-radius: $avatar-height/2;
  background-color: rgba(154, 157, 165, 0.5);
  box-shadow: 0 0 20px 0px rgb(82, 87, 90);
  display: flex;
  flex-direction: column; 
  user-select: none;
  cursor: pointer;
  .inner_wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    .avatar_btn {
      position: relative; 
      transition: left .4s cubic-bezier(.38,.94,1,.77);
      width: $avatar-height - $avatar-border;
      height: $avatar-height - $avatar-border; 
      margin: $avatar-border/2;
      z-index: 2;
      left:0;
      &.on_logging_in {
        left:$avatar-width - $avatar-height;
      }
    }
    .user_name {
      position:relative;
      z-index: 1;
      left: 0;
      padding: 0 15px; 
      transition: left .4s cubic-bezier(.38,.94,1,.77);
      &.on_logging_in {
        left:-($avatar-height);
      }
    }
  }
  &.isShownBG{
    color: #fff;
  }
}
.bg_setting_switch,.game_enable_switch{
  padding:0px 0 10px 0;
}
</style>
