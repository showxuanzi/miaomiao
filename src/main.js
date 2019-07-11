import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter("setWH",(url,arg) => {
  return url.replace(/w\.h/,arg)
});

import Scroll from '@/components/Scroll'
Vue.component('Scroll',Scroll);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
