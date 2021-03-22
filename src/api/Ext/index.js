/*
 * @Author: your name
 * @Date: 2021-03-18 16:49:58
 * @LastEditTime: 2021-03-22 16:01:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/api/Ext/bingBG.js
 */
//
import request from '@/utils/request'
export async function getDailyBG() {
    return request({
        url:'/api/v1/Vendor/Bing/GetDailyBG',
        method: 'get'
    })
}