/*
 * @Author: your name
 * @Date: 2021-03-03 11:18:22
 * @LastEditTime: 2021-05-05 15:43:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/router/router.js
 */
import HomePage from '@/views/HomePage'
import Playground from '@/views/Playground'
import Controls from '@/views/Controls'
import Index from '@/views/Index'
import ArticleCreate from '@/views/Articles/create'
import ArticleView from '@/views/Articles/view'
import Article from '@/views/Articles/index'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'
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
      page: 'Index',
    },
  },
  {
    path: '/Home',
    name: '上传页面',
    component: HomePage,
    meta: {
      page: 'Index',
    },
  },
  {
    path: '/Controls',
    name: '控件库',
    component: Controls,
    meta: {
      icon: 'el-icon-menu',
      page: 'Index',
    },
  },
  {
    path: '/Article',
    component: Article,
    meta: {
      layout: 'blank',
      hidden: true,
    },
    children: [
      {
        path: 'Create',
        name: '发布文章',
        component: ArticleCreate,
      },
      {
        path: 'View/:id',
        name: '查看文章',
        component: ArticleView,
        meta: {
          hidden: true,
        },
      },
    ],
  },
  {
    path:'/Login',
    component:Login,
    meta:{
      hidden:true
    }
  },
  {
    path:'/:pathMatch(.*)*',
    component:NotFound,
    meta:{
      layout: 'blank',
      hidden:true
    }
  }
]
export { routes }
