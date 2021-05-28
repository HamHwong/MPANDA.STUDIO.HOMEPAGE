import { createStore ,createLogger} from 'vuex'
import modules from './modules'
import getters from './getters' 
export default createStore({
  modules,
  getters,
  plugins: process.env.NODE_ENV !== 'production'
  ? [createLogger()]
  : []
}) 
