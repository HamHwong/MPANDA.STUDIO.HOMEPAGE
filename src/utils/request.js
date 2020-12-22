/*
 * @Author: your name
 * @Date: 2020-12-21 00:23:48
 * @LastEditTime: 2020-12-22 17:58:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /homepage/src/utils/request.js
 */
import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service = axios.create({
  baseURL:'http://localhost:8100',
  // 超时
  timeout: 10000
})
export default service