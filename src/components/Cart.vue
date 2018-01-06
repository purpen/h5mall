<template>
  <div class="mix-container">
    <div class="mix-cart" v-if="is_login">
      <div class="mix-cart__body">
        <div class="mix-cart__item clearfix" v-for="(item, index) in cart.items" :key="item.rid">
          <div class="left-side pull-left">
            <input type="checkbox" class="checkbox" checked="checked" @change="hook_checked_one(item.rid)" />
          </div>
          <img v-lazy="item.product.cover" class="pull-left image" />
          <div class="content">
            <h4 class="title">{{ item.product.product_name }}</h4>
            <p class="sku">{{ item.product.s_model }} {{ item.product.s_color }}</p>
            <p class="sale_price"><span class="currency">￥</span>{{ item.product.sale_price }}</p>
          </div>
          <label class="close">
            <i class="el-icon-close"></i>
          </label>
          <div class="mix-input mix-input--mini quantity">
            <input type="text" :value="item.quantity" class="mix-input__inner" />
          </div>
        </div>
      </div>

      <div class="mix-cart__footer">
        <div class="left-side pull-left">
          <input type="checkbox" class="checkbox" name="check-all" id="check-all" v-model="checked" @click="handle_checked_all" />
        </div>
        <label for="check-all">全选</label>

        <label class="subtotal">合计：{{ total_amount }}</label>

        <button class="mix-button mix-button--checkout pull-right" @click="hook_checkout">
          结算
        </button>
      </div>
    </div>
    <div class="mix-cart__empty" v-else>
      <p>登录后才能看到购物车商品哦~</p>
      <el-button type="danger" @click="goto" plain>立即登录</el-button>
    </div>
  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'Cart',
    data () {
      return {
        checked: true,
        checked_list: [],
        cart: {
          items: [],
          total_count: 0
        }
      }
    },
    computed: {
      is_login () {
        return this.$store.state.token
      },
      title () {
        return this.$router.history.current.meta.title
      },
      total_amount () {
        let amount = 0;
        for (const item of this.cart.items) {
          amount += Number.parseFloat(item.product.sale_price) * item.quantity
        }
        return '￥' + amount
      }
    },
    created () {
      this.get_carts()
    },
    watch: {
      checked_list: {
        handler () {
          if (this.checked_list.length === this.cart.items.length) {
            this.checked = true
          } else {
            this.checked = false
          }
        },
        deep: true
      }
    },
    methods: {
      // 获取购物车列表
      get_carts () {
        this.$axiosWrap.get(api.cart).then((result) => {
          if (result.success) {
            this.cart = result.data
          }
        }).catch((error) => {
          this.$message.error(error.status.message)
        })
      },
      hook_checked_one (rid) {
        const idx = this.checked_list.indexOf(rid);
        if (idx > 0) {
          this.checked_list.splice(idx, 1)
        } else {
          this.checked_list.push(rid)
        }
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
        this.$router.push({ name: 'order', params: { checked_rid: [] } })
      },
      goto () {
        return this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .mix-cart {
    position: relative;
    background: #efeef4;
    min-height: 400px;
  }
  .mix-cart__body {
    background: #ffffff;
  }
  .mix-cart__item {
    padding: 20px 15px;
    border-bottom: 1px solid #f3f3f3;
    position: relative;
  }
  .mix-cart__item .close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    color: #a4a4a6;
  }
  .mix-cart__item .left-side {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
  }
  .mix-cart__item .image {
    width: 80px;
    height: 80px;
    margin-left: 15px;
  }
  .mix-cart__item .content {
    margin-left: 110px;
    padding: 0 0 0 20px;
  }
  .mix-cart__item .content .title {
    font-size: 14px;
    color: #010101;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .mix-cart__item .content .sku {
    font-size: 12px;
    color: #888888;
    margin-bottom: 20px;
  }
  .mix-cart__item .content .sale_price {
    color: #010101;
    font-weight: 500;
    font-size: 14px;
  }
  .mix-cart__item .content .sale_price .currency {
    font-size: 12px;
  }
  .mix-cart__item .quantity {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 60px;
  }
  .mix-cart__item .quantity .mix-input__inner {
    text-align: center;
    border-color: #cecece;
  }

  .mix-cart__footer {
    background: #ffffff;
    position: fixed;
    bottom: 51px;
    left: 0;
    z-index: 9;
    width: 100%;
  }
  .mix-cart__footer .left-side {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-left: 15px;
  }
  .mix-cart__footer label {
    line-height: 40px;
    color: #6d6b78;
    margin-left: 10px;
  }
  .mix-cart__footer .subtotal {
    color: #fc5449;
    font-weight: 500;
    margin-left: 20px;
  }

  .mix-cart__empty {
    margin: 50px auto;
    text-align: center;
    min-height: 300px;
  }
  .mix-cart__empty p {
    margin: 15px auto;
  }


</style>
