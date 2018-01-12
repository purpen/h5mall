<template>
    <div
      class="fx-order__item">
      <div class="head">
        <label>订单号：{{ order.rid }}</label>
        <label class="text-danger pull-right">{{ status_label(order.status) }}</label>
      </div>
      <div class="content">
        <div
          class="fx-sku"
          v-for="sku in order.items"
          :key="sku.rid">
            <div class="fx-sku__image">
              <img v-lazy="sku.cover" :alt="sku.product_name">
            </div>
            <div class="fx-sku__content">
              <h4 class="title">{{ sku.product_name }}</h4>
              <p class="mode">{{ sku.s_model }} {{ sku.s_color }} <span class="m-l-10">x{{ sku.quantity }}</span></p>
            </div>
        </div>
      </div>
      <div class="subtotal">
        <p>
          共 {{ order.total_quantity }} 件， 合计：<span class="text-price"><span class="currency">￥</span>{{ order.pay_amount }}</span>
        </p>
      </div>
      <div class="actions">
        <button class="fx-button fx-button--mini" @click="hook_click_signed">确认收货</button>
        <button class="fx-button fx-button--mini" @click="hook_click_cancel">取消订单</button>
        <button class="fx-button fx-button--warn fx-button--mini" @click="hook_click_pay">立即付款</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'fx-order-item',
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    data () {
      return {

      }
    },
    methods: {
      hook_click_pay () { // 支付订单

      },
      hook_click_cancel () { // 取消订单

      },
      hook_click_signed () { // 确认收货

      },
      status_label (status) {
        if (status === 1) {
          return '待付款'
        } else if (status === 10) {
          return '待发货'
        } else if (status === 17) {
          return '待收货'
        }
        return '已完成'
      }
    }
  }
</script>

<style scoped>
  .fx-order__item {
    background: #ffffff;
    margin-top: 10px;
  }
  .fx-order__item .head {
    line-height: 40px;
    padding: 0 16px;
  }
  .fx-order__item .content {
    padding: 0;
  }
  .fx-order__item .subtotal {
    border-bottom: 1px solid #f5f5f5;
    padding: 0 16px;
    line-height: 40px;
    text-align: right;
  }
  .fx-order__item .actions {
    line-height: 40px;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-end;
    padding: 10px 16px;
  }

</style>
