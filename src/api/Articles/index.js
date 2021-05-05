/*
 * @Author: your name
 * @Date: 2021-05-05 13:59:21
 * @LastEditTime: 2021-05-05 15:14:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\api\Articles\index.js
 */
import request from '@/utils/request'
export async function Create(data) {
    return request({
        url:'/api/v1/article/create',
        method: 'post',
        data
    })
}
export async function Update(id){
  return request({
      url:'/api/v1/article/update/'+id,
      method:'post'
  })
}
export async function Get(id){
  return request({
      url:'/api/v1/article/get/'+id,
      method:'get'
  })
}
export async function Delete(id){
  return request({
      url:'/api/v1/article/delete/'+id,
      method:'post'
  })
}
export async function Search(){
  return request({
      url:'/api/v1/article/search/:keywords',
      method:'get'
  })
}
export async function List(cateId,start,count,order){
  if(!cateId)cateId=''
  return request({
      url:'/api/v1/article/list/'+cateId,
      method:'post',
      data:{
        start,
        count,
        order
      }
  })
}