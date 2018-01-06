import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import utils from './utils';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

Vue.config.debug = debug;
Vue.config.warnExpressionErrors = false;

// 定义状态State默认值
const state = {
  author: 'Mix',
  loading: false, // 是否显示loading
  message_count: utils.message_count(),
  platform: utils.platform(),
  layout_config: {
    show_back: true,  // 是否显示返回按钮
    show_footer: true,  // 是否显示底部
    show_header: true, // 是否显示头部
    show_searcher: true // 是否显示搜索
  },
  title: 'D3IN',
  token: null,
  // 购物车信息
  cart: {
    total_count: 0
  },
  user: {}
};


const mutations = {
  [types.CART_UPDATE_COUNT] (state, data) {
    state.cart.total_count += data;
    localStorage.setItem('cart_total_count', state.cart.total_count)
  },
  [types.LOGIN] (state, data) {
    state.token = data;
    localStorage.token = data
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token;
    localStorage.token = token;
  },
  [types.LOGOUT] (state) {
    state.token = null;
    localStorage.removeItem('token')
  },
  [types.REVOKE_TOKEN] (state) {
    state.token = null;
    console.log('Logout and remove token');
    localStorage.removeItem('token')
  },
  [types.SHOW_HEADER] (state, data) {
    state.layout_config.show_header = data;
    localStorage.setItem('show_header', data)
  },
  [types.SHOW_FOOTER] (state, data) {
    state.layout_config.show_footer = data;
    localStorage.setItem('show_footer', data)
  },
  demo (state, name) {
    state.author = name
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  strict: debug
});

export default store;
