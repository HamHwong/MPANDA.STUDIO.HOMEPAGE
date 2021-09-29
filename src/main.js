/*
 * @Author: your name
 * @Date: 2021-01-06 14:43:44
 * @LastEditTime: 2021-05-05 17:37:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/main.js
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import * as Layouts from './layouts'
// import VueMarkdownIt from 'vue3-markdown-it' 
import 'highlight.js/styles/monokai.css';
import 'vditor/dist/index.css'
import auth from './auth'
import store from './store'
import directive from './directives'
import MPC from '@mpanda/mpc'
import '@mpanda/mpc/lib/mpc.css'

let app = createApp(App).use(store).use(ElementPlus).use(MPC)

// Auto Load Layouts
for (var layoutName in Layouts) {
  app.component(layoutName.toLocaleLowerCase() + '-layout', Layouts[layoutName])
} 
// End Load
// app.use(VueMarkdownIt) 
app.use(directive)
// app.use(CKEditor)
auth(router)
app.use(router) 
app.mount('#app')
