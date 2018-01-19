<template>
  <div class="fx-container">
    <fx-header :show_back="true">
      <label class="actions text-primary" @click="hook_service_phone" slot="right-sider">
        <i class="fx-icon-customer-service"></i> 在线客服
      </label>
    </fx-header>

    <div class="fx-container__menu">
      <fx-list
        @click="hook_change_tab"
        :tabs="tabs"
        :active_item="current_status">
      </fx-list>
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
  import FxHeader from '@/components/block/FxHeader'
  import FxList from '@/components/fx/FxList'
  import FxOrderList from '@/components/fx/FxOrderList'

  export default {
    name: 'UserOrders',
    props: {
      status: {
        type: Number,
        default () {
          return 0
        }
      }
    },
    data () {
      return {
        current_status: 0,
        tabs: [
          { name: '全部', id: 0 },
          { name: '待付款', id: 1 },
          { name: '待发货', id: 10 },
          { name: '待收货', id: 20 }
        ],
        orders: []
      }
    },
    mounted () {
      this.current_status = this.status;
      this.get_orders()
    },
    methods: {
      // 获取订单列表
      get_orders () {
        const vm = this;
        this.$axiosWrap.get(api.orders, {
          params: { status: vm.current_status }
        }).then((result) => {
          if (result.success) {
            this.orders = result.data.orders
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      },
      hook_change_tab (index) {
        this.current_status = this.tabs[index].id;
        this.get_orders()
      },
      hook_service_phone () {
        console.log('客服热线');
      }
    },
    components: {
      FxList,
      FxHeader,
      FxOrderList
    }
  }
</script>

<style scoped>
  .fx-container__body.is-orders {
    flex-direction: column;
  }

</style>
