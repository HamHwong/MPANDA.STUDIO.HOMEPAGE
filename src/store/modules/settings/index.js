export default { 
  namespaced: true,
  state: { 
    isShownBG:true
  }, 
  mutations: { 
    'SET_TOP_NAV_BG_DISPLAY':(state,isShownBG)=>{
      //console.log('state',state)
      state.isShownBG = isShownBG
      //console.log('state',state)
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
