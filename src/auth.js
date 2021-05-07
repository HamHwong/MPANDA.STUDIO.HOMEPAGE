function hasMeta(route,key){
  var result = false
  if(route.meta){
    if(!key) result = true
    else if(route.meta[key])return true
  }else{
    result = false
  } 
  return result
}
// TODO
function Auth(router){
  router.beforeEach((to,from,next)=>{ 
    console.log(to,from)
    next()
  })
}
module.exports = Auth