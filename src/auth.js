import store from '@/store'
import { ElNotification as $notify } from 'element-plus'
import { hasRole } from './utils/auth'

function getMeta(route, key) {
  var result = null
  if (route.meta) {
    if (!key) result = null
    else if (route.meta[key]) return route.meta[key]
  } else {
    result = null
  }
  return result
}
function RedirectToLogin(next,query,message="您还未登录！"){
  $notify({
    title:message,
    message: `请登陆后操作!` ,
    type: 'error',
  }) 
  next({path:"/login",query}) 
}
const whiteList = ["login"]
function Auth(router) {
  router.beforeEach((to, from, next) => { 
    if (whiteList.includes(to.name)) { 
      next()
      return 
    }
    if(to.meta.role&&to.meta.role.length>0){ 
      // Unlogin
      if(!store.getters.userId){
        RedirectToLogin(next,{redirectTo:to.fullPath}) 
        return 
      }
      const requiredRoles = getMeta(to, 'role')
      if(hasRole(requiredRoles)){
        // have permission 
        next()
      }else{
        // have no permission
        RedirectToLogin(next,{redirectTo:to.fullPath})
        return 
      } 
    }else{  
      next()
    }
    
  })
}
export default Auth
