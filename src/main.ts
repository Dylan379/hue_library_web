import { createApp } from 'vue'
// import { createApp, h } from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Message from 'element-plus'
//Elmessage的样式
import 'element-plus/theme-chalk/index.css'
const app = createApp(App)
// const app = createApp({
//     render: () => h(App)
// });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(createPinia())
app.use(Message)
app.mount('#app')