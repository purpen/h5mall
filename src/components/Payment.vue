<template>
  <div class="fx-container">
    <div class="fx-container__header">
      <h4>订单提交成功</h4>
      <p>请在23小时58分50秒内完成支付，超时订单将关闭。</p>
    </div>
    <div class="fx-container__body">
      <div class="fx-panel">
        <div class="fx-panel__body">
          <p>订单编号：</p>
          <p>订单金额：</p>
          <p>收货信息：</p>
          <p>发票类型：</p>
          <p>发票抬头：</p>
        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__title">
          请选择支付方式
        </div>
        <div class="fx-panel__body">

        </div>
      </div>
    </div>
    <div class="fx-container__footer is_fixed_bottom">
      <button class="fx-button mx-button--checkout pull-right">
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
