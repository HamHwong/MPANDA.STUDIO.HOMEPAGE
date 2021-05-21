export default {
  namespaced: true,
  state:{
    _id: null,
    id: null,
    account: null,
    avatar: null,
    createDate: null,
    display_name: 'sss',
    email: null,
    mobile: null,
    roles: [],
    updateDate: null,
  },
  mutations:{
    'UPDATE_USER_INFO'(state,data){ 
      for(var key in data){
        state[key] = data[key] 
      }
    }
  },
  actions:{
    update_user_info({commit},UserInformation){
      commit('UPDATE_USER_INFO',UserInformation)
    }
  }
}