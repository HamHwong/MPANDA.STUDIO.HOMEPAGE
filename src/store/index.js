import { createStore ,createLogger} from 'vuex'
import modules from './modules'
import getters from './getters' 
import createPersistedState from "vuex-persistedstate";
// console.log(getters)
export default createStore({
  modules:modules,
  getters:getters,
  plugins: [createPersistedState()],
  // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
}) 
