export default { 
  state: { 
    isShownGB:false
  }, 
  mutations: { 
    'SET_TOP_NAV_BG_DISPLAY':(state,isShownGB)=>{
      state.isShownGB = isShownGB
    }
  }, 
  actions: { 
    hideBG({commit}){
      commit('SET_TOP_NAV_BG_DISPLAY',false)
    },
    showBG({commit}){
      commit('SET_TOP_NAV_BG_DISPLAY',true)
    }
  } 
}
