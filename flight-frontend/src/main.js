import { createApp } from 'vue'
import App from './App.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

import router from "./router.js"

const app = createApp(App)
app.config.globalProperties.$message = ElMessage;
app.use(router)
app.mount('#app')

