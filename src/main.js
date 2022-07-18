require('./views')
require('./bootstrap')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTelInput from 'vue-tel-input'
import './assets/sass/app.scss'

Vue.config.productionTip = false
Vue.use(VueTelInput, {
  autoFormat: true,
  defaultCountry: 'KE',
  onlyCountries: ['KE'],
  mode: 'international',
  dropdownOptions: {
    width: '320px',
    required: true,
    showDialCodeInList: false
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
