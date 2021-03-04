/*
 * @Author: your name
 * @Date: 2021-03-03 11:18:22
 * @LastEditTime: 2021-03-04 16:49:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/router/router.js
 */
import HomePage from '@/views/HomePage'
import Playground from '@/views/Playground'
import Controls from '@/views/Controls'
import Index from '@/views/Index'
const routes = [{
  path: '/',
  name: 'Index',
  component: Index,
  meta:{ 
    icon:'el-icon-menu',
    layout:'blank'
  }
},{
  path: '/PlayGround',
  name: 'PlayGround',
  component: Playground,
  meta:{ 
    icon:'el-icon-menu'
  }
}, {
  path: '/Home',
  name: '上传页面',
  component: HomePage,
  meta:{ 
  }
}, {
  path: '/Controls',
  name: '控件库',
  component: Controls,
  meta:{ 
    icon:'el-icon-menu'
  }
}]
export {
    routes
}