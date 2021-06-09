export default {
  namespaced: true,
  state: {
    isShowGame: false,
  },
  mutations: {
    Game_State: (state, isShowGame) => {
      state.isShowGame = isShowGame
    },
  },
  actions: {
    start({ commit }) {
      commit('Game_State', true)
    },
    stop({ commit }) {
      commit('Game_State', false)
    },
  },
}
