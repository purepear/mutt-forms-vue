import Vue from 'vue'
import App from './App.vue'
import MuttVue from '../src/main'
import MuttCustomText from './CustomText.vue'

Vue.use(MuttVue, {
    plugins: {
        MuttCustomText
    }
})

new Vue({ //eslint-disable-line
  el: '#app',
  render: h => h(App)
})
