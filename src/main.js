import Vue from 'vue'
import App from './App.vue'
import calculator from './components/calculator'

Vue.config.productionTip = false

Vue.use(calculator);

new Vue({
  render: h => h(App),
}).$mount('#app')
