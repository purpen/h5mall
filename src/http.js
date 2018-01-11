// 封装fetch、post请求及http拦截器配置文件

import axios from 'axios';
import Qs from 'qs';
import CryptoJS from 'crypto-js';
import store from './vuex/store';
import * as types from './vuex/types';
import router from './router';

const app_key = 'fDzcyanIjw7AukFWUQs2';
const app_secret = 'c9bbacc18c477ca0ca41012a6731db8418207299';

// 生成随机字符串
function random_string(len) {
  len = len || 16;
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let nonce_str = '';
  for (let i = 0; i < len; i++) {
    nonce_str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce_str;
}

// 生成验证请求签名
function build_sign(timestamp, nonce_str) {
  const params = {
    app_key: app_key,
    timestamp: timestamp,
    nonce_str: nonce_str
  };
  const keys = Object.keys(params);
  keys.sort();

  const param_ary = [];
  for (let i = 0; i < keys.length; i++) {
    param_ary.push(keys[i] + '=' + params[keys[i]]);
  }

  return CryptoJS.SHA1(param_ary.join('&') + app_secret).toString();
}

// 为每个请求自动添加系统级参数
function append_system_params() {
  const t = Date.parse(new Date()) / 1000;
  const s = random_string(16);
  return {
    app_key: app_key,
    timestamp: t,
    nonce_str: s,
    sign: build_sign(t, s)
  }
}

// axios 配置
const axiosWrap = axios.create({
  timeout: 5000,
  baseURL: 'http://127.0.0.1:5000/api/v1.0/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 负责 `params` 序列化的函数
  paramsSerializer: (params) => {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }
});

// http request 拦截器
axiosWrap.interceptors.request.use(
  (config) => {
    // 添加验证签名
    config.params = {
      ...config.params, ...append_system_params()
    };
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
      // 添加axios头部Authorized
      config.auth = {
        username: store.state.token,
        password: store.state.token
      };
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);

// http response 拦截器, 401状态时跳转登录页并清除token
axiosWrap.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);

          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }

    return Promise.reject(error) // 返回接口返回的错误信息
  }
);

export default axiosWrap;
