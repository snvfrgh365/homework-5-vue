import './assets/css/css.css'
import './assets/css/font-awesome.css'
import './assets/css/jquery-ui.min.css'
import './assets/css/keyboard.css'
import './assets/css/jquery.bxslider.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
