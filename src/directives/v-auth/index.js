import store from '@/store'
import { hasRole } from '../../utils/auth'
export default {
  // created(el,binding){
  //   console.log(el,binding)
  // },
  // beforeMount(el,binding) {
  //   console.log('beforeMount',el,binding)
  // },
  mounted(el,binding) {  
    var roles = binding.value 
    if(!hasRole(roles)){
      el.parentNode.removeChild(el);
    }
  }, 
  // beforeUpdate(el,binding){
  //   console.log('beforeUpdate',el,binding)
    
  // },
  // updated(el,binding){
  //   console.log('updated',el,binding)
  // },
  // beforeUnmount(el,binding){
  //   console.log('beforeUnmount',el,binding)
  // },
  // unmounted(el,binding){
  //   console.log('unmounted',el,binding)
  // }
}
