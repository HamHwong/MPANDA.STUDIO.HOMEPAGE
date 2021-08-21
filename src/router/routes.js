import HomePage from '@/views/HomePage'
import Playground from '@/views/Playground'
import Tools from '@/views/Tools'
import Controls from '@/views/Controls'
import Index from '@/views/Index'
import ArticleCreate from '@/views/Articles/create'
import ArticleView from '@/views/Articles/view'
import ArticleUpdate from '@/views/Articles/update'
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
    path: '/Tools',
    name: '日常工具',
    component: Tools,
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
        meta:{
          role:['admin']
        }
      },
      {
        path: 'View/:id',
        name: '查看文章',
        component: ArticleView,
        meta: {
          hidden: true,
        },
      },
      {
        path: 'Update/:id',
        name: '编辑文章',
        component: ArticleUpdate,
        meta: {
          hidden: true,
          role:['admin']
        },
      },
    ],
  },
  {
    path:'/Login',
    name:'login',
    component:Login,
    meta:{
      layout: 'blank',
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
