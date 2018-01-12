<template>
  <div class="fx-container">

    <div class="fx-container__menu">
      <fx-list :tabs="tabs" v-on:click="hook_change_tab"></fx-list>
    </div>

    <div class="fx-container__body is-orders">
      <fx-order-list :orders="orders"></fx-order-list>

      <div class="fx-empty-tips">
        没有更多
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/constant/api'
  import FxList from '@/components/fx/FxList'
  import FxOrderList from '@/components/fx/FxOrderList'

  export default {
    name: 'UserOrders',
    data () {
      return {
        tabs: [
          { name: '全部', status: 0 },
          { name: '待付款', status: 1 },
          { name: '待发货', status: 10 },
          { name: '待收货', status: 20 }
        ],
        active_tab: 0,
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
        this.$axiosWrap.get(api.orders, {
          params: { status: vm.status }
        }).then((result) => {
          if (result.success) {
            this.orders = result.data.orders
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      },
      hook_change_tab (index) {
        let counter = 0;
        for (const tab of this.tabs) {
          if (counter === index) {
            this.status = tab.status
          }
          counter += 1
        }
        this.get_orders()
      }
    },
    components: {
      FxList,
      FxOrderList
    }
  }
</script>

<style scoped>
  .fx-container__body.is-orders {
    flex-direction: column;
  }

</style>
