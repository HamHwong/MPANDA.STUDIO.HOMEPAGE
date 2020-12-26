/*
 * @Author: your name
 * @Date: 2020-12-21 00:23:48
 * @LastEditTime: 2020-12-22 17:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /homepage/src/api/index.js
 */
import request from '@/utils/request'
export async function UploadImage(params){
  return request({
    url: '/api/v1/image/upload',
    method: 'post',
    data: params
  }) 
}
export async function GetImage(params){
  return request({
    url: '/api/v1/image/'+params.id,
    method:'get'
  })
}
export async function UploadMXDImage(params){
  return request({
    url: '/api/v1/MapleStory/image/upload',
    method:'post',
    data: params
  })
}
export async function GetMXDImageInfo(params){
  return request({
    url: '/api/v1/MapleStory/image/search',
    method:'post',
    data: params
  })
}