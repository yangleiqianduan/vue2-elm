import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import './config/rem'
import FastClick from 'fastclick'

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	strict: process.env.NODE_ENV !== 'production'
})


new Vue({
	router,
}).$mount('#app')


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
