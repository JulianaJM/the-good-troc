import Vue from 'vue';
import VeeValidate from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './_store';
import { router } from './_router';

import App from './App.vue';

Vue.use(VeeValidate);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})