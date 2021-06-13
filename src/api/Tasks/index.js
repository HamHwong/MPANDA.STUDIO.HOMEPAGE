 
import request from '@/utils/request'
export async function Create(data) {
    return request({
        url:'/api/v1/tasks/create',
        method: 'post',
        data
    })
}
export async function Update(id,data){
  return request({
      url:'/api/v1/tasks/update/'+id,
      method:'post',
      data
  })
}
export async function Get(id){
  return request({
      url:'/api/v1/tasks/get/'+id,
      method:'get'
  })
}
export async function Delete(id){
  return request({
      url:'/api/v1/tasks/delete/'+id,
      method:'post'
  })
}
export async function Search(){
  return request({
      url:'/api/v1/tasks/search/:keywords',
      method:'get'
  })
}
export async function List(){ 
  return request({
      url:'/api/v1/tasks/list',
      method:'get', 
  })
}