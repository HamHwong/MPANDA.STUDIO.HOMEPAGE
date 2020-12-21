/*
 * @Author: your name
 * @Date: 2020-12-21 00:23:48
 * @LastEditTime: 2020-12-21 13:18:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /homepage/src/api/index.js
 */
import request from '@/utils/request'
export async function UploadImage(params){
  return request({
    url: 'http://localhost:8100/api/v1/imageUpload',
    method: 'post',
    data: params
  }) 
}