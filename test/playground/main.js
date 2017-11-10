import Vue from 'vue'
import App from './AppReadOnly.vue'
import MuttVue from '../../src/main'

Vue.use(MuttVue, {})

new Vue({ //eslint-disable-line
    el: '#app',
    render: h => h(App)
})
