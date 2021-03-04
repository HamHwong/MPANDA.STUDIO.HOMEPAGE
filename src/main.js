/*
 * @Author: your name
 * @Date: 2021-01-06 14:43:44
 * @LastEditTime: 2021-03-04 17:05:34
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
// import defaultLayout from './layouts/default'
// import blankLayout from './layouts/blank' 
import * as Layouts from './layouts' 

let app = createApp(App) 

// Auto Load Layouts
for(var layoutName in Layouts){
    app.component(layoutName.toLocaleLowerCase()+'-layout',Layouts[layoutName])
}
// End Load

app.use(router)
app.use(ElementPlus) 
app.mount('#app')
