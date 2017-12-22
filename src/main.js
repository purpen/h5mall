// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import default_thn from '@/assets/images/default_thn.png'
import App from './App'
import axiosWrap from './http'
import router from './router'
import store from './vuex/store'


// 将axios挂载到prototype上，在组件中可以直接使用this.$axiosWrap访问
Vue.prototype.$axiosWrap = axiosWrap;

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueAwesomeSwiper);

Vue.use(ElementUI, { size: 'small' });

Vue.use(VueLazyload, {
  loading: default_thn
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axiosWrap,
  router,
  store,
  template: '<App/>',
  components: { App }
});
