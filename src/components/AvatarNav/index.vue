<template>
  <div>
    <div
      class="wrapper"
    >
      <div
        class="inner_wrapper"
        @click.native="handleBtnClick"
      >
        <el-avatar
          :class="{
            avatar_btn: true,
            on_login: hasLogin,
          }"
          shape="circle"
          size="large"
          :src="squareUrl"
        />
        <span class="user_name">
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
.wrapper {
  position: absolute;
  right: 0px;
  top: 0px;
  // width: 100px;
  // height: 60px;
  overflow: hidden;
  margin: 10px;
  border-radius: 50px;
  background-color: rgba(165, 154, 154, 0.212);
  box-shadow: 0 0 20px 0px rgb(82, 87, 90);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  .inner_wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    .avatar_btn {
      transition: all 2s ease-in-out;
      &.on_login {
        transform: translateX(65px);
      }
    }
  }
  .user_name {
    padding: 0 15px;
  }
}
</style>
