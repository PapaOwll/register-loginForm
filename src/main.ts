import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Notification from "notiwind";

const vuetify = createVuetify({
    components,
    directives,

})
const  app = createApp(App)
app.use(vuetify).use(router).use(Notification)
    .mount('#app')
