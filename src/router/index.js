/*
 * @Author: your name
 * @Date: 2021-01-06 14:43:44
 * @LastEditTime: 2021-02-20 16:58:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/router/index.js
 */
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import HomePage from '@/views/HomePage'
import Playground from '@/views/Playground'
import Controls from '@/views/Controls'
const routes = [{
  path: '/PlayGround',
  name: 'PlayGround',
  component: Playground
}, {
  path: '/Home',
  name: 'Home',
  component: HomePage
}, {
  path: '/',
  name: 'Controls',
  component: Controls
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router