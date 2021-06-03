<template>
  <div>
    <div
      class="wrapper"
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
  </div>
</template>

<script>
import store from '@/store'
import { computed, ref, watch } from '@vue/runtime-core'
import login from '@/views/Login'
export default {
  setup() {
    const squareUrl = ref(
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    )

    const hasLogin = computed(() => store.getters.hasLogin) 
    function handleBtnClick() {
      if (!hasLogin.value) {
        store.dispatch('settings/showLogin')
      }
    }
    return {
      userDisplayName: computed(() => store.getters.userDisplayName),
      squareUrl,
      handleBtnClick,
      hasLogin, 
      login
    }
  },
}
</script>

<style lang="scss">
$avatar-width:120px;
$avatar-height:40px;
.wrapper {
  width: $avatar-width;
  height:$avatar-height;
  overflow: hidden;
  margin: 10px;
  border-radius: $avatar-height/2;
  background-color: rgba(165, 154, 154, 0.212);
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
      width: $avatar-height;
      height: $avatar-height;
      left:0;
      &.on_logging_in {
        left:$avatar-width - $avatar-height;
      }
    }
    .user_name {
      position:relative;
      left: 0;
      padding: 0 15px; 
      transition: left .4s cubic-bezier(.38,.94,1,.77);
      &.on_logging_in {
        left:-($avatar-height);
      }
    }
  }
}
</style>
