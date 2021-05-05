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
import VueMarkdownIt from 'vue3-markdown-it' 
import 'highlight.js/styles/monokai.css';
import 'vditor/dist/index.css'

let app = createApp(App)

// Auto Load Layouts
for (var layoutName in Layouts) {
  app.component(layoutName.toLocaleLowerCase() + '-layout', Layouts[layoutName])
}
// End Load
app.use(VueMarkdownIt)
// app.use(CKEditor)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
