<template>
  <div class="mx-container">

    <div class="mx-container__menu">
      <ul class="list">
        <li class="item">待付款</li>
        <li class="item">待发货</li>
        <li class="item active">待收货</li>
        <li class="item">售后订单</li>
      </ul>
    </div>

    <div class="mx-container__body is-orders">

      <div class="mx-orders__list">
        订单列表....
      </div>

    </div>
  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'UserOrders',
    data () {
      return {
        orders: [],
        status: 0
      }
    },
    computed: {
      title () {
        return '我的订单'
      }
    },
    mounted () {
      this.get_orders()
    },
    methods: {
      // 获取订单列表
      get_orders () {
        const vm = this;
        this.$axiosWrap.get(api.orders).then((result) => {
          if (result.success) {
            this.orders = result.data.orders
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      }

    }
  }
</script>

<style scoped>
  .mx-container__body.is-orders {
    flex-direction: column;
  }
  .mx-orders__list {
    padding: 20px;
  }

</style>
