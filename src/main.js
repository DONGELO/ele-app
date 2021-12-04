import Vue from 'vue'
import vueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'

//svgIcon
import '@/svgIcon'

import '@/styles/main.scss'

Vue.use(vueCompositionApi)

Vue.use(Vant);
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
