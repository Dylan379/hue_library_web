import './assets/css/reset.css'
import './style.css'
//Elmessage的样式
import 'element-plus/theme-chalk/index.css'
import { createApp } from 'vue'
// import { createApp, h } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import Message from 'element-plus'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import '../theme/index.css'
const app = createApp(App)
// const app = createApp({
//     render: () => h(App)
// });
axios.defaults.baseURL = 'https://mock.apifox.cn/m1/2597435-0-default'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// // 注册全局组件
// Object.keys(ElIconModules).forEach(key => {
//     app.component(key, ElIconModules[key as keyof typeof ElIconModules])
//   })

app.use(router)
app.use(createPinia())
app.use(Message)
app.mount('#app')