/*
 * @Author: your name
 * @Date: 2020-12-21 00:23:48
 * @LastEditTime: 2021-04-17 15:47:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /homepage/src/utils/request.js
 */
import axios from 'axios';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const service = axios.create({
  baseURL:'http://localhost:8100',
  // baseURL:'https://api.mpanda.studio/',
  // 超时
  timeout: 10000
}) 

service.interceptors.request.use((config)=>{ 
  return config
},(err)=>{ 
  return Promise.reject(err)
})

service.interceptors.response.use((response)=>{ 
  return response.data
},(err)=>{ 
  return Promise.reject(err)
})


export default service