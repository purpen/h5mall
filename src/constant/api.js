// 配置API接口文件
export default {
  // Auth
  auth_login: '/auth/login',  // POST 登录
  auth_logout: '/auth/logout',  // POST 退出登录
  auth_register: '/auth/register', // POST 注册
  auth_check_mobile: '/auth/mobile', // GET 验证手机号是否存在
  auth_get_msm_code: '/auth/get_msm_code', // POST 获取手机验证码

  // User
  user: '/users',   // GET 获取用户（当前登录用户）
  user_profile: '/users/:id/profile', // GET 获取用户资料（当前登录用户）

  // Category
  categories: '/categories',  // GET 获取产品分类


  // Product
  products: '/products',  // GET 产品列表
  product_recommend_list: '/products/recommend_list', // GET 产品推荐列表
  product_detail: '/products/:rid', // GET 产品详情
  product_skus: '/products/skus',  // GET 产品SKU
  skus: '/products/by_sku',  // GET 产品SKU信息

  // Cart
  cart: '/cart',  // GET 购物车列表
  cart_addon: '/cart',  // POST 添加产品至购物车
  cart_remove: '/cart/remove',  // DELETE 移除产品
  cart_clear: '/cart/clear', // DELETE 清空购物车
  cart_item_count: '/cart/get_item_count',  // GET 购物车产品数

  // Order
  orders: '/orders',  // GET 订单列表
  order_detail: '/orders/:id',  // GET 订单详情
  order_quick_buy: '/orders/quick_buy',  // POST 立即购买
  order_by_cart: '/orders/cart_buy',  // POST 购物车下单
  order_create: '/orders/create', // POST 新增订单
  order_delete: '/orders/:id/delete',  // DELETE 删除订单
  order_pay: '/orders/nowpay',  // POST 支付订单

  // City
  cities: '/address/cities',  // GET 城市列表
  city: '/address/cities',   // GET 城市信息

  // Address
  addresses: '/address', // GET 地址列表
  address_addto: '/address/addto',  // POST 添加收货地址
  address_update: '/address/:id/update',  // PUT 编辑收货地址
  address_delete: '/address/:id/delete',   // DELETE 删除收货地址
  address_default: '/address/is_default',  // GET 获取默认地址
  address_set_default: '/address/:id/set_default', // PUT 快捷更新默认收货地址

  // Pay
  pay_wechat: '/pay/wechat', // POST 微信支付

  // Brand
  brand_list: '/brands',  // GET 品牌列表

  // Slides
  slide_list: '/common/slides',  // GET 幻灯片列表

  // Test
  demo: '/demo'
}
