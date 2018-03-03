import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
// import VueCookie from 'vue-cookie'

import App from './App'
import router from './router'
import store from './store'

// import 'vue-material-design-icons/styles.css'
import 'mdi/css/materialdesignicons.css'

// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuex)
// Vue.use(BootstrapVue)
Vue.use(Vuetify)
// Vue.use(VueCookie)

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
