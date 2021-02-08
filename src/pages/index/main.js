/*
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:13:43
 * @LastEditTime: 2021-02-08 09:22:42
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from './plugins/AntDesign'
import '../../registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/styles/index.less'

// 权限拦截器
import './permission'

// if (process.env.NODE_ENV === "production") {
//   const { mockXHR } = require("mock/index/mockXHR.ja");
//   mockXHR();
// }

const app = createApp(App)
// 注册全局常用的ant-design-vue组件
setupAntd(app)

app.use(store).use(router)

app.mount('#app')
