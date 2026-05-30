import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { store } from './store/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { parallaxDirective } from './directives/parallax.js'

const app = createApp(App)

app.use(router).use(store)
app.directive('parallax', parallaxDirective)
app.mount('#app')
