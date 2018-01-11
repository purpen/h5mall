<template>
  <div class="mx-container">
    <div class="mx-container__header">
      <h4>订单提交成功</h4>
      <p>请在23小时58分50秒内完成支付，超时订单将关闭。</p>
    </div>
    <div class="mx-container__body">
      <div class="mx-panel">
        <div class="mx-panel__body">
          <p>订单编号：</p>
          <p>订单金额：</p>
          <p>收货信息：</p>
          <p>发票类型：</p>
          <p>发票抬头：</p>
        </div>
      </div>

      <div class="mx-panel">
        <div class="mx-panel__title">
          请选择支付方式
        </div>
        <div class="mx-panel__body">

        </div>
      </div>
    </div>
    <div class="mx-container__footer is_fixed_bottom">
      <button class="mx-button mx-button--checkout pull-right">
        去支付
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Payment',
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
