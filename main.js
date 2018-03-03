import Vue from 'vue'
import axios from 'axios'
// import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'
import store from './store'

// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// Vue.use(BootstrapVue)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
