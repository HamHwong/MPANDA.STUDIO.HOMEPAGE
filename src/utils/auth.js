import store from '@/store'
export function hasRole(roles=[]) { 
  try{
    if (typeof roles === 'string'&&roles.trim()!=='') {
      if (roles.split(',').length > 1) {
        roles = roles.split(',')
      } else if (roles.split(' ').length > 1) {
        roles = roles.split(' ')
      } else if (roles.split(';').length > 1) {
        roles = roles.split(';')
      } else if (roles.split('|').length > 1) {
        roles = roles.split('|')
      } else {
        roles = [roles]
      }
    }
    roles = roles.map((i) => i.trim())
    if(roles.length===0) {
      console.warn(Error('未指定Role Auth！').stack) 
      return true
    }
    else return roles.some((requireRole) => store.getters.roles.includes(requireRole))
  }catch (e){
    console.warn(e.stack)
  }
}
