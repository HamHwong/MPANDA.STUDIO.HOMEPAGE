export default { 
  namespaced: true,
  state: { 
    isShownBG:true,
    isShowLoginDialog:false
  }, 
  mutations: { 
    'SET_TOP_NAV_BG_DISPLAY':(state,isShownBG)=>{
      state.isShownBG = isShownBG 
    },
    'SET_LOGIN_DIALOG':(state,ifShowDialog)=>{
      state.isShowLoginDialog = ifShowDialog
    }
  }, 
  actions: { 
    hideBG({commit}){
      commit('SET_TOP_NAV_BG_DISPLAY',false)
    },
    showBG({commit}){
      commit('SET_TOP_NAV_BG_DISPLAY',true)
    },
    showLogin({commit}){
      commit('SET_LOGIN_DIALOG',true) 
    },
    hideLogin({commit}){
      commit('SET_LOGIN_DIALOG',false) 
    }
  } 
}
