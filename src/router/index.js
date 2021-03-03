/*
 * @Author: your name
 * @Date: 2021-01-06 14:43:44
 * @LastEditTime: 2021-03-03 14:11:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/router/index.js
 */
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import {routes} from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router