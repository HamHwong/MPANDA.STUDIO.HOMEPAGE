/*
 * @Author: your name
 * @Date: 2021-03-03 11:18:22
 * @LastEditTime: 2021-04-04 22:36:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/router/router.js
 */
import HomePage from '@/views/HomePage'
import Playground from '@/views/Playground'
import Controls from '@/views/Controls'
import Index from '@/views/Index'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      icon: 'el-icon-menu',
      layout: 'blank',
    },
  },
  {
    path: '/PlayGround',
    name: 'PlayGround',
    component: Playground,
    meta: {
      icon: 'el-icon-menu',
      page:'Index'
    },
  },
  {
    path: '/Home',
    name: '上传页面',
    component: HomePage,
    meta: {
      page:'Index'
    },
  },
  {
    path: '/Controls',
    name: '控件库',
    component: Controls,
    meta: {
      icon: 'el-icon-menu',
      page:'Index'
    },
  },
]
export { routes }
