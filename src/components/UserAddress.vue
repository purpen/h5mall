<template>
  <div class="mx-container">
    <div class="mx-container__body">
      <div class="mx-address">
        <div
          v-for="address in address_list"
          :key="address.rid"
          class="mx-address__item">
          <div class="content">
            <span class="icon pull-left" @click="hook_selected_address(address.rid)">
              <i class="fa fa-map-marker"></i>
            </span>
            <h3 class="title">{{ address.full_name }} {{ address.mobile }}</h3>
            <p class="summary">{{ address.province }}{{ address.city }}{{ address.town }}{{ address.area }}{{ address.street_address }}</p>
          </div>
          <div class="action">
            <span>
              <input type="checkbox" :id="address.rid"> <label :for="address.rid">默认</label>
            </span>

            <span class="pull-right">
              <router-link :to="{ 'name': 'orders' }" class="m-r-15">
                <i class="fa fa-edit"></i> 编辑
              </router-link>
              <router-link :to="{ 'name': 'orders' }">
                <i class="fa fa-trash"></i> 删除
              </router-link>
            </span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/constant/api';

  export default {
    name: 'UserAddress',
    props: ['checkout_skus'],
    data () {
      return {
        address_list: [],
        selected_address: {}
      }
    },
    created () {
      this.get_address_list()
    },
    methods: {
      // 获取收货地址列表
      get_address_list () {
        const vm = this;

        this.$axiosWrap.get(api.addresses).then((result) => {
          if (result.success) {
            vm.address_list = result.data
          }
        }).catch((error) => {
          vm.$message.error(error.message);
        })
      },

      // 选中某个地址
      hook_selected_address (rid) {
        for (const addr of this.address_list) {
          if (addr.rid === rid) {
            this.selected_address = addr
          }
        }
        // 跳转回订单结算
        this.$router.push({ name: 'checkout',
          params: { selected_address: this.selected_address, checkout_skus: this.checkout_skus }
        })
      }
    }
  }
</script>

<style scoped>

</style>
