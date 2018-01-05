import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Products from '@/components/Products';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register';
import Logout from '@/components/auth/Logout'
import User from '@/components/User'
import UserProfile from '@/components/UserProfile'
import UserPosts from '@/components/UserPosts'
import Demo from '@/components/Demo'

import store from '../vuex/store';
import axiosWrap from '../http';
import * as types from '../vuex/types';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '精选'
    }
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/products/:rid',
    name: 'product',
    component: ProductDetail,
    props: true,
    meta: {
      show_header: false,
      show_footer: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      title: '购物车',
      show_header: false,
      show_footer: false,
      required: true
    },
    component: Cart
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    props: true,
    meta: {
      title: '我',
      show_header: false,
      required: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: 'profile',
        component: UserProfile,
        meta: {
          required: true
        }
      },
      {
        path: 'posts',
        component: UserPosts,
        meta: {
          required: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      show_header: false,
      show_footer: false
    },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
      show_header: false,
      show_footer: false
    },
    component: Register
  },
  {
    path: '/forgot_passwd',
    name: 'forgot_passwd',
    meta: {
      title: '找回密码',
      show_header: false,
      show_footer: false
    },
    component: Demo
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  }
];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new Router({
  mode: 'history',
  routes
});

// vue-router提供的钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.required)) {
    if (store.state.token) {
      store.commit(types.SET_TOKEN, localStorage.token);

      // 添加axios头部Authorized
      axiosWrap.defaults.auth = {
        username: store.state.token,
        password: store.state.token
      };

      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }

  // 是否显示头部
  if (to.meta.show_header === false) {
    store.commit(types.SHOW_HEADER, false)
  } else {
    store.commit(types.SHOW_HEADER, true)
  }
  // 是否显示底部
  if (to.meta.show_footer === false) {
    store.commit(types.SHOW_FOOTER, false)
  } else {
    store.commit(types.SHOW_FOOTER, true)
  }
});

export default router;
