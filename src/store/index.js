import { createStore ,createLogger} from 'vuex'
import modules from './modules'
import getters from './getters' 
const store = createStore({
  modules,
  getters,
  plugins: process.env.NODE_ENV !== 'production'
  ? [createLogger()]
  : []
})
export default store
