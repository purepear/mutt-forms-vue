import Vue from 'vue'
import MuttVue from 'mutt-forms-vue'
import App from './App.vue'

Vue.use(MuttVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
