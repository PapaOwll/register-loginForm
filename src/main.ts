import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases , mdi} from 'vuetify/iconsets/mdi-svg'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
const icons =  createVuetify({
    icons :{
        defaultSet: "mdi",
        aliases,
        sets:{
            mdi,
        }
    }
})
const vuetify = createVuetify({
    components,
    directives,

})
const  app = createApp(App).use(icons)
app.use(vuetify).use(router)
    .mount('#app')
