import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Find from '@/components/Find'
import Product from '@/components/Product'
import ProductDetail from '@/components/ProductDetail'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import Payment from '@/components/Payment'
import User from '@/components/User'
import UserCenter from '@/components/UserCenter'
import UserProfile from '@/components/UserProfile'
import UserOrders from '@/components/UserOrders'
import UserAddress from '@/components/UserAddress'
import UserPosts from '@/components/UserPosts'
import UserWishlist from '@/components/UserWishlist'
import UserBonus from '@/components/UserBonus'
import Search from '@/components/Search'
import Feedback from '@/components/Feedback'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Logout from '@/components/auth/Logout'
import ForgotPasswd from '@/components/auth/ForgotPasswd'
import Demo from '@/components/Demo'

import store from '../vuex/store'
import axiosWrap from '../http'
import * as types from '../vuex/types'


Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '精选',
      show_header: false
    }
  },
  {
    path: '/find',
    name: 'find',
    component: Find,
    meta: {
      show_header: false,
      title: '分类'
    }
  },
  {
    path: '/products/:pid/:cid',
    name: 'products',
    component: Product,
    props: true
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
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    props: true,
    meta: {
      title: '订单结算',
      show_header: false,
      show_footer: false,
      required: true
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
    props: true,
    meta: {
      title: '支付订单',
      show_header: false,
      required: true
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '我的'
    },
    children: [
      {
        path: '',
        name: 'user',
        component: UserCenter,
        meta: {
          show_header: false
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile,
        meta: {
          required: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: UserOrders,
        meta: {
          title: '我的订单',
          required: true
        }
      },
      {
        path: 'address',
        name: 'address',
        component: UserAddress,
        props: true,
        meta: {
          title: '我的地址',
          show_footer: false,
          required: true
        }
      },
      {
        path: 'wishlist',
        name: 'wishlist',
        component: UserWishlist,
        meta: {
          title: '我的心愿单',
          required: true
        }
      },
      {
        path: 'bonus',
        name: 'bonus',
        component: UserBonus,
        meta: {
          title: '我的红包',
          required: true
        }
      },
      {
        path: 'posts',
        name: 'posts',
        component: UserPosts,
        meta: {
          required: true
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      title: '搜索',
      show_footer: false
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: Feedback,
    meta: {
      title: '意见反馈',
      show_header: false,
      show_footer: false,
      required: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      show_header: false,
      show_footer: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册',
      show_header: false,
      show_footer: false
    }
  },
  {
    path: '/forgot_passwd',
    name: 'forgot_passwd',
    component: ForgotPasswd,
    meta: {
      title: '找回密码',
      show_header: false,
      show_footer: false
    }
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
  routes
});

// vue-router提供的钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
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
  // 是否需要认证
  if (to.matched.some(r => r.meta.required)) {
    if (store.state.token) {
      store.commit(types.SET_TOKEN, localStorage.token);

      // 添加axios头部Authorized
      axiosWrap.defaults.auth = {
        username: store.state.token,
        password: store.state.token
      };

      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
});

export default router;
