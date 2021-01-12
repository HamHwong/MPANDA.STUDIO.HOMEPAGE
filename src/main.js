/*
 * @Author: your name
 * @Date: 2021-01-06 14:43:44
 * @LastEditTime: 2021-01-07 11:19:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/main.js
 */
import { createApp } from 'vue'  
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue' 
import router from './router'  
// import '@/assets/scss/index.scss'
let app = createApp(App)
app.use(router)
app.use(ElementPlus) 
app.mount('#app')
