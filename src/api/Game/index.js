/*
 * @Author: your name
 * @Date: 2021-04-13 14:44:25
 * @LastEditTime: 2021-04-13 14:45:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/api/Game/index.js
 */
import request from '@/utils/request'
export function init(){
  return request({
    url: '/api/v1/game/init',
    method:'post'
  })
}