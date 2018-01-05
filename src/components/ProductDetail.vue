<template>
  <div class="mix-product-page" ref="product-detail">

    <router-link :to="{ name: 'cart' }" class="mix-btn-cart">
      <i class="el-icon-goods"></i>
    </router-link>

    <div class="mix-product-cover">
      <img v-lazy="product.cover" class="image">
    </div>

    <div class="mix-product-header">
      <h3 class="title">
        {{ product.name }}
      </h3>
      <p class="price">
        ￥ {{ product.sale_price }}
      </p>
    </div>

    <div class="mix-block small mix-product-brand">
      <router-link :to="{ name:'product', params: { rid: product.rid }}" class="media">
        <img v-lazy="product.brand.logo" class="image">
      </router-link>
      <label class="title">{{ product.brand.name }}</label>

      <span class="indicator pull-right">
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>

    <div class="mix-block mix-sku-group">
      <label class="title">已选</label>
      <label class="summary">白色，2个</label>

      <span class="indicator pull-right">
        <i class="el-icon-more"></i>
      </span>
    </div>

    <div class="mix-block mix-ship-address">
      <label class="title">送至</label>
      <label class="summary"></label>

      <span class="indicator pull-right">
        <i class="el-icon-more"></i>
      </span>
    </div>

    <div class="mix-panel">
      <label class="panel-title">
        热门评价
      </label>

      <div class="panel-content">

      </div>
    </div>

    <div class="mix-panel">
      <label class="panel-title">
        商品详情
      </label>

      <div class="panel-content">
        {{ product.content }}
      </div>
    </div>

    <div class="mix-product-footer">
      <a class="collect">
        <i class="el-icon-star-off"></i>
        <span>收藏</span>
      </a>
      <a class="service" @click="show_service_dialog">
        <i class="el-icon-service"></i>
        <span>客服</span>
      </a>
      <a class="cart" @click="show_sku_modal('cart')">加入购物车</a>
      <a class="buy" @click="show_sku_modal('buy')">立即购买</a>
    </div>

    <div class="cover-bg" v-if="seen_servicer" @click="hide_service_dialog"></div>
    <div class="mix-service" v-if="seen_servicer">
      <label class="close" @click="hide_service_dialog">x</label>
      <i class="el-icon-service"></i>
      <h2>客服电话</h2>
      <a class="tel" href="tel:4008-798-751">4008-798-751</a>
    </div>

    <div class="cover-bg" v-if="seen_sku_box" @click="hide_sku_modal"></div>
    <transition name="fade">
      <div class="mix-sku-box clearfix" v-if="seen_sku_box">
        <label class="close" @click="hide_sku_modal">x</label>

        <div class="sku-header">
          <img :src="choosed.cover" class="sku-image">
          <p>{{ product.name }}</p>
          <p class="price">￥<i>{{ choosed.sale_price }}</i></p>
          <p class="stock">库存：{{ choosed.stock_count }}</p>
        </div>

        <div class="block" v-if="has_mode">
          <label class="block-title">规格</label>

          <div class="sku-group clearfix">
              <span v-for="(mode, index) in skus.modes"
                    :class=" is_active_mode(index) ? 'active option': 'option' "
                    :disabled="!mode.valid"
                    @click="handle_choose_mode(index, mode.valid)">
                {{ mode.name }}
              </span>
          </div>
        </div>

        <div class="block" v-if="has_color">
          <label class="block-title">颜色</label>

          <div class="sku-group clearfix">
              <span v-for="(color, index) in skus.colors"
                    :class=" is_active_color(index) ? 'active option': 'option' "
                    :disabled="!color.valid"
                    @click="handle_choose_color(index, color.valid)">
                {{ color.name }}
              </span>
          </div>

        </div>

        <div class="block mix-quantity">
          <label class="block-title">数量</label>

          <el-input-number v-model="quantity" class="pull-right" size="mini" @change="handle_change" :min="1" :max="choosed.stock_count"></el-input-number>
        </div>

        <div class="sku-footer">
          <div class="btn-group" v-if="buy_way">
            <button class="confirm" @click="handle_addto_cart" :disabled="disabled" v-if="buy_way === 'cart'">
              {{ cart_title }}
            </button>
            <button :to="1" class="confirm" @click="handle_quick_buy" :disabled="disabled" v-if="buy_way === 'buy'">
              {{ buy_title }}
            </button>
          </div>

          <div class="chooseSubmit" v-if="!buy_way">
            <button class="confirm" @click="handle_confirm_cart" >
              添加购物车
            </button>
            <button :to="1" class="confirm" @click="confirm_buy" >
              立即购买
            </button>
          </div>
        </div>


      </div>
    </transition>

  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'ProductDetail',
    data () {
      return {
        rid: 0,
        product: {
          brand: {
            logo: ''
          }
        },
        skus: {
          modes: [],
          colors: []
        },
        choosed: {},
        active_mode: 0,
        choose_mode: {},
        active_color: 0,
        choose_color: {},
        quantity: 1,
        disabled: false,
        // 是否显示客服层
        seen_servicer: false,
        // 是否显示sku层
        seen_sku_box: false,
        cart_title: '',
        buy_title: '',
        // 购买方式：立即购买 或 加入购物车
        buy_way: ''
      }
    },
    computed: {
      is_login () {
        return this.$store.state.token !== null
      },
      has_mode () {
        return this.skus.modes.length !== 0
      },
      has_color () {
        return this.skus.colors.length !== 0
      }
    },
    created () {
      this.rid = this.$route.params.rid;
      this.get_product();
      this.get_skus()
    },
    methods: {
      // 获取产品信息
      get_product () {
        this.$axiosWrap.get(api.product_detail.replace(/:rid/g, this.rid)).then((result) => {
          if (result.success) {
            this.product = result.data
          }
        }).catch((error) => {
          this.$message.error(error.status.message)
        })
      },
      get_skus () {
        this.$axiosWrap.get(api.product_skus, { params: { rid: this.rid } }).then((result) => {
          if (result.success) {
            this.skus = result.data;

            this.initial_show_sku()
          }
        }).catch((error) => {
          this.$message.error(error.status.message)
        })
      },
      // 获取默认地址
      get_default_address () {

      },
      // 获取全部地址
      get_all_addresses () {

      },
      // 加入购物车
      post_add_cart () {
        this.$axiosWrap.post(api.cart_addon, {
          rid: this.choosed.rid, quantity: this.quantity, option: ''
        }).then((result) => {
          if (result.success) {
            // ...
          }
        }).catch((error) => {
          this.$message.error(error.status.message)
        })
      },
      // 显示客服
      show_service_dialog () {
        this.seen_servicer = !this.seen_servicer
      },
      hide_service_dialog () {
        this.seen_servicer = false
      },
      // 改变购买数量
      handle_change (v) {
        if (this.choosed.stock_count && this.choosed.stock_count >= v) {
          this.quantity = v
        } else {
          this.$message.warning('库存不足');
          this.quantity = this.choosed.stock_count
        }
      },
      handle_choose_mode (idx, valid) {
        if (!valid) return;
        this.active_mode = idx;
        this.choose_mode = this.skus.modes[idx];

        // 重新筛选与型号匹配的颜色
        const filter_colors = [];
        for (const c of this.skus.colors) {
          if (!this.has_exist_item(this.choose_mode.name, c.name)) {
            c.valid = false
          } else {
            c.valid = true
          }
          filter_colors.push(c)
        }

        this.skus.colors = filter_colors;

        for (const item of this.skus.items) {
          if (item.s_model === this.choose_mode.name) {
            if (this.has_color) {
              if (item.s_color === this.choose_color.name) {
                this.choosed = item
              }
            } else {
              this.choosed = item
            }
          }
        }
      },
      handle_choose_color (idx, valid) {
        if (!valid) return;
        this.active_color = idx;
        this.choose_color = this.skus.colors[idx];

        // 重新筛选与颜色匹配的型号
        const filter_modes = [];
        for (const m of this.skus.modes) {
          if (!this.has_exist_item(m.name, this.choose_color.name)) {
            m.valid = false
          } else {
            m.valid = true
          }
          filter_modes.push(m)
        }
        this.skus.modes = filter_modes;

        for (const item of this.skus.items) {
          if (item.s_color === this.choose_color.name) {
            if (this.has_mode) {
              if (item.s_model === this.choose_mode.name) {
                this.choosed = item
              }
            } else {
              this.choosed = item
            }
          }
        }
      },
      show_sku_modal (ev) {
        this.seen_sku_box = !this.seen_sku_box;
        if (this.seen_sku_box) {
          document.body.removeAttribute('class', 'disableScroll');
          document.childNodes[1].removeAttribute('class', 'disableScroll')
        } else {
          document.body.setAttribute('class', 'disableScroll');
          document.childNodes[1].setAttribute('class', 'disableScroll')
        }

        this.buy_way = '';
        if (ev === 'cart') {
          this.buy_way = 'cart';
          this.cart_title = '加入购物车'
        } else if (ev === 'buy') {
          this.buy_way = 'buy';
          this.buy_title = '直接购买'
        }
      },
      hide_sku_modal () {
        this.seen_sku_box = false
      },
      handle_addto_cart () {
        if (this.validate_choose_sku()) {
          this.disabled = true;
          this.cart_title = '正在添加购物车';
          this.post_add_cart()
        }
      },
      handle_quick_buy () {

      },
      // 立即购买
      quick_buy () {

      },
      // 初始优化选中的sku
      initial_show_sku () {
        // 默认选中第一个
        if (this.has_mode) {
          this.choose_mode = this.skus.modes[this.active_mode];
          for (const item of this.skus.items) {
            if (item.s_model === this.choose_mode.name) {
              this.choosed = item
            }
          }
        }

        if (this.has_color) {
          this.choose_color = this.skus.colors[this.active_color];
          for (const item of this.skus.items) {
            if (item.s_color === this.choose_color.name) {
              this.choosed = item
            }
          }
        }

        // 同时存在时，color获取实际存在的一个
        if (this.has_mode && this.has_color) {
          let ct = 0;
          for (const item of this.skus.items) {
            if (item.s_model === this.choose_mode.name) {
              this.active_color = ct;
              this.choose_color = this.skus.colors[this.active_color];
              this.choosed = item
            }
            ct += 1
          }
        }
      },
      validate_choose_sku () {
        if (!this.is_login) {
          this.$message.warning('请先登录');
          this.$router.push({ name: 'login' });
          return false
        }
        if (!this.choosed) {
          this.$message.warning('请先选定商品');
          return false
        }
        if (!this.quantity) {
          this.$message.warning('选定的数量不足');
          return false
        }
        return true
      },
      has_exist_item (mode, color) {
        for (const item of this.skus.items) {
          if (item.s_model === mode && item.s_color === color) {
            return true
          }
        }
        return false
      },
      is_active_mode (index) {
        return this.active_mode === index
      },
      is_active_color (index) {
        return this.active_color === index
      }
    }
  }
</script>

<style scoped>
  .mix-product-page {
    position: relative;
  }

  .mix-block {
    background: #fff;
    border-top: 1px solid #E6E6E6;
    border-bottom: 1px solid #E6E6E6;
    padding: 12px 15px;
  }
  .mix-block .title {
    color: #c4c4c4;
    font-size: 15px;
  }
  .mix-block .summary {
    color: #101010;
    font-size: 15px;
  }
  .mix-block .image {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 200px;
  }
  .mix-block.small .image {
    width: 50px;
    height: 50px;
    border-radius: 100px;
  }
  .mix-block .indicator i {
    color: #c8c8c8;
  }

  .mix-product-brand .title {
    line-height: 50px;
    margin-left: 10px;
  }
  .mix-product-brand .indicator {
    line-height: 50px;
  }

  .mix-product-header {
    padding: 0 15px 10px;
    background: #fff;
    border-bottom: 1px solid #E6E6E6;
  }
  .mix-product-header .title {
    font-size: 16px;
    line-height: 16px;
    margin: 10px auto;
  }
  .mix-product-header .price {
    font-size: 15px;
    color: #BE8914;
  }

  .mix-panel {
    /*height: 1000vh;*/
    margin: 10px auto;
  }
  .mix-panel .panel-title {
    font-size: 15px;
    letter-spacing: 2px;
    text-align: center;
    line-height: 46px;
    height: 50px;
    color: #999;
    position: relative;
    display: block;
  }
  .mix-panel .panel-title:before {
    content: "";
    position: absolute;
    left: 15px;
    top: 22.5px;
    width: 34%;
    height: 1px;
    background: #9994;
  }
  .mix-panel .panel-title:after {
    content: "";
    position: absolute;
    right: 15px;
    top: 22.5px;
    width: 34%;
    height: 1px;
    background: #9994;
  }

  .mix-product-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    z-index: 2;
  }
  .mix-product-footer a {
    float: left;
    position: relative;
    width: 20%;
    height: 40px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mix-product-footer a i {
    margin-right: 10px;
  }
  .mix-product-footer a.buy {
    border-right: none;
    width: 30%;
    font-size: 14px;
    background: #BE8914;
    color: #fff
  }
  .mix-product-footer a.cart {
    border-right: none;
    width: 30%;
    font-size: 14px;
    background: #222;
    color: #fff
  }

  .cover-bg {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background: #00000080;
  }

  .mix-service {
    width: 252px;
    height: 222px;
    background: #ffffff;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    font-size: 17px;
    border-radius: 6px;
  }
  .mix-service .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #5f646e;
    font-weight: 100;
    width: 25px;
    height: 25px;
    font-size: 25px;
    line-height: 20px;
    text-align: center;
  }
  .mix-service h2 {
    font-weight: 600;
    color: #222;
    margin: 18px 0 12px;
  }
  .mix-service .tel {
    color: #BE8914;
  }

  .mix-sku-box {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 50%;
    padding-bottom: 50px;
    background: #fff;
  }
  .mix-sku-box .block {
    margin: 20px 15px;
    font-size: 14px;
  }
  .mix-sku-box .block.mix-quantity .block-title {
    line-height: 30px;
  }
  .mix-sku-box .block .sku-group {
    margin-top: 10px;
  }
  .mix-sku-box .block .option {
    background: #FAFAFA;
    border: 1px solid #E6E6E6;
    border-radius: 2px;
    color: #666666;
    font-size: 12px;
    padding: 6px 24px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }
  .mix-sku-box .block .option.active{
    color: #BE8914;
    border-color: #BE8914;
  }
  .mix-sku-box .block .option:last-child {
    margin-right: 0;
  }
  .mix-sku-box .block .option[disabled] {
    color: gray;
    border-color: #f1f1f1;
    cursor: not-allowed;
    background: #f1f1f1;
  }

  .mix-sku-box .sku-header {
    padding: 10px 0 40px 126px;
    position: relative;
    border-bottom: 1px solid #0000001a;
  }
  .sku-header p {
    font-size: 14px;
    line-height: 20px;
    color: #666666;
  }
  .sku-header .price {
    color: #BE8914;
    font-size: 18px;
    margin-top: 10px;
  }
  .sku-header .stock {
    font-size: 13px;
  }
  .sku-header .sku-image {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -28px;
    left: 10px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #0000001a;
    padding: 1px;
    background-color: #fff;
  }

  .mix-sku-box .close {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    border: 0.5px solid #5f646e;
    color: #5f646e;
    font-weight: 100;
    width: 25px;
    height: 25px;
    font-size: 22px;
    line-height: 25px;
    text-align: center;
  }
  .mix-sku-box .sku-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    z-index: 9;
  }
  .mix-sku-box .sku-footer .btn-group .confirm {
    background: #BE8914;
    color: #fff;
    width: 100%;
    height: 40px;
  }

  .chooseSubmit {
    display: flex;
  }

  .chooseSubmit .confirm {
    color: #fff;
    flex: 1;
    height: 40px;
  }

  .chooseSubmit .confirm:first-child {
    background-color: #FF9500;
    border: 1px solid #FF9500;
  }

  .chooseSubmit .confirm:last-child {
    background-color: #BE8914;
    border: 1px solid #BE8914;
  }

  .mix-btn-cart {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 99;
    font-size: 15px;
  }
  .mix-product-page .mix-product-cover img {
    width: 100%;
  }
  .mix-product-header,
  .mix-sku-group,
  .mix-ship-address,
  .mix-product-brand
  {
    margin-top: 10px;
  }
</style>
