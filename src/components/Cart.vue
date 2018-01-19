<template>
  <div class="fx-container">
    <fx-header></fx-header>
    <div class="fx-container__body m-t-10">

      <div class="fx-cart" v-if="is_login">
        <div class="fx-cart__body">

          <div class="fx-cart__item clearfix" v-for="(item, index) in cart.items" :key="item.rid">
            <div class="left-side pull-left">
              <input type="checkbox" class="checkbox" :value="item.rid" v-model="checked_list"  />
            </div>
            <img v-lazy="item.product.cover" class="pull-left image" />
            <div class="content">
              <h4 class="title">{{ item.product.product_name }}</h4>
              <p class="sku">{{ item.product.s_model }} {{ item.product.s_color }}</p>
              <p class="sale_price"><span class="currency">￥</span>{{ item.product.sale_price }}</p>
            </div>
            <label class="close">
              <i class="fx-icon-close-error"></i>
            </label>
            <div class="fx-input fx-input--mini quantity">
              <input type="text" class="fx-input__inner" v-model.number="item.quantity" @keyup="calculate_amount">
            </div>
          </div>

        </div>

        <div class="fx-cart__footer">
          <div class="left-side pull-left">
            <input type="checkbox" class="checkbox" name="check-all" id="check-all" v-model="checked" @click="handle_checked_all" />
          </div>
          <label for="check-all">全选</label>

          <label class="subtotal">合计：<span class="currency">￥</span>{{ cart.total_amount }}</label>

          <button class="fx-button fx-button--checkout pull-right" @click="hook_checkout">
            结算
          </button>
        </div>
      </div>

      <div class="fx-cart__empty" v-else>
        <p>登录后才能看到购物车商品哦~</p>
        <button class="fx-button mx-button--danger" @click="hook_login_click">
          立即登录
        </button>
      </div>

    </div>
  </div>
</template>

<script>

  import api from '@/constant/api'
  import * as types from '@/vuex/types'
  import FxHeader from '@/components/block/FxHeader'

  export default {
    name: 'Cart',
    data () {
      return {
        checked: false,
        checked_list: [],
        cart: {
          items: [],
          total_count: 0,
          total_amount: 0
        }
      }
    },
    components: {
      FxHeader
    },
    computed: {
      is_login () {
        return this.$store.state.token
      }
    },
    created () {
      this.get_carts()
    },
    watch: {
      checked_list: {
        handler () {
          this.checked = this.checked_list.length === this.cart.items.length;
          this.calculate_amount()
        },
        deep: true
      }
    },
    methods: {
      // 获取购物车列表
      get_carts () {
        const vm = this;
        this.$axiosWrap.get(api.cart).then((result) => {
          if (result.success) {
            vm.cart = result.data;
            vm.v_cart_item_count()
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      },
      handle_checked_all () {
        if (this.checked) { // 实现反选
          this.checked_list = []
        } else { // 实现全选
          this.checked_list = [];
          for (const item of this.cart.items) {
            this.checked_list.push(item.rid);
          }
        }
      },
      // 结算事件
      hook_checkout () {
        const checkout_skus = [];
        for (const item of this.cart.items) {
          if (this.checked_list.indexOf(item.rid) !== -1) {
            checkout_skus.push({
              rid: item.rid,
              quantity: item.quantity,
              deal_price: Number.parseFloat(item.product.sale_price),
              discount_amount: 0
            })
          }
        }

        this.$router.push({ name: 'checkout', params: { checkout_skus: checkout_skus } })
      },
      // 计算购物车总金额
      calculate_amount () {
        let amount = 0;
        for (const item of this.cart.items) {
          if (this.checked_list.indexOf(item.rid) !== -1) {
            amount += Number.parseFloat(item.product.sale_price) * item.quantity
          }
        }
        this.cart.total_amount = amount
      },
      v_cart_item_count () {
        let sum_count = 0;
        for (const item of this.cart.items) {
          sum_count += item.quantity;
        }
        // 更新state
        this.$store.commit(types.UPDATE_CART_COUNT, sum_count);
      },
      // 跳转至登录
      hook_login_click () {
        return this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .fx-cart {
    background: #efeef4;
    position: relative;
    min-height: 400px;
    flex: 1;
  }
  .fx-cart__body {
    background: #ffffff;
  }
  .fx-cart__item {
    padding: 20px 15px;
    border-bottom: 1px solid #f3f3f3;
    position: relative;
  }
  .fx-cart__item .close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: #a4a4a6;
  }
  .fx-cart__item .left-side {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }
  .fx-cart__item .image {
    width: 80px;
    height: 80px;
    margin-left: 15px;
  }
  .fx-cart__item .content {
    margin-left: 110px;
    padding: 0 0 0 20px;
  }
  .fx-cart__item .content .title {
    font-size: 14px;
    color: #010101;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .fx-cart__item .content .sku {
    font-size: 12px;
    color: #888888;
    margin-bottom: 20px;
  }
  .fx-cart__item .content .sale_price {
    color: #010101;
    font-weight: 500;
    font-size: 14px;
  }
  .fx-cart__item .content .sale_price .currency {
    font-size: 12px;
  }
  .fx-cart__item .quantity {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 60px;
  }
  .fx-cart__item .quantity .fx-input__inner {
    text-align: center;
    border-color: #cecece;
  }

  .fx-cart__footer {
    background: #ffffff;
    position: fixed;
    bottom: 51px;
    left: 0;
    z-index: 9;
    width: 100%;
  }
  .fx-cart__footer .left-side {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-left: 15px;
  }
  .fx-cart__footer label {
    line-height: 40px;
    color: #6d6b78;
    margin-left: 10px;
  }
  .fx-cart__footer .subtotal {
    color: #fc5449;
    font-weight: 500;
    margin-left: 20px;
  }

  .fx-cart__empty {
    margin: 50px auto;
    text-align: center;
    min-height: 300px;
  }
  .fx-cart__empty p {
    margin: 15px auto;
  }

</style>
