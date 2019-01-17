import Vue from 'vue'
import VueI18n from 'vue-i18n'
import MuttVue from 'mutt-forms-vue'
import App from './App.vue'

Vue.use(VueI18n)
Vue.use(MuttVue)

const messages = {
  en: {
    'Submit': 'Submit',
  },
  de: {
    'Submit': 'Vorlegen',
  }
}

const i18n = new VueI18n({
  locale: 'de',
  messages,
})

new Vue({
  el: '#app',
  render: h => h(App),
  i18n,
})
