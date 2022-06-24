import Vue from 'vue'
import App from './App.vue'

import './assets/css/styles.css'
import './assets/css/animations.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
