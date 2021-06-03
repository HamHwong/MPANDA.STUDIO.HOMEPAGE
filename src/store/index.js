import { createStore ,createLogger} from 'vuex'
import modules from './modules'
import getters from './getters' 
// console.log(getters)
export default createStore({
  modules:modules,
  getters:getters,
  // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
}) 
