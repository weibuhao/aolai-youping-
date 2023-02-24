// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import './utils/request.js'
import store from './store'
import '@/utils/methods.js'

Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'

import App from './App.vue'


export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
