/*
 * @Author: your name
 * @Date: 2020-12-21 00:23:48
 * @LastEditTime: 2021-04-20 15:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /homepage/src/utils/request.js
 */
import axios from 'axios';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
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