/*
 * @Author: your name
 * @Date: 2021-03-03 11:18:22
 * @LastEditTime: 2021-03-03 16:33:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/router/router.js
 */
import HomePage from '@/views/HomePage'
import Playground from '@/views/Playground'
import Controls from '@/views/Controls'
const routes = [{
  path: '/PlayGround',
  name: 'PlayGround',
  component: Playground,
  meta:{
    name:'Playground',
    icon:'el-icon-menu'
  }
}, {
  path: '/Home',
  name: 'Home',
  component: HomePage,
  meta:{
    name:'上传页面', 
  }
}, {
  path: '/',
  name: 'Controls',
  component: Controls,
  meta:{
    name:'控件库',
    icon:'el-icon-menu'
  }
}]
export {
    routes
}