export default { 
  state: {
    a:1
  }, 
  mutations: {
    'UPDATE':(state)=>{
      state.a += 1
    }
  }, 
  actions: {
    increment(ctx){
      ctx.commit('UPDATE')
    }
  } 
}
