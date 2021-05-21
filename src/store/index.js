import { createStore } from 'vuex'
import modules from './modules'
import getters from './getters'
//console.log('modules',modules)
const store = createStore({
  modules,
  getters,
})
export default store
