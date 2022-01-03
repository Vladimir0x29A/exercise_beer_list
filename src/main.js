import Vue from 'vue'
import App from './App.vue'
import axios from '@/axiosSetup';
import store from './store';

Vue.config.productionTip = false

Vue.prototype.axios = axios;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
