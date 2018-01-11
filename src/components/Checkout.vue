<template>
  <div class="mx-container">
    <div class="mx-container__body">
      <div class="mx-panel">
        <div class="mx-panel__body">

          <div class="mx-address" v-if="selected_address">
            <div class="mx-address__item">
              <div class="content">
                <span class="icon pull-left">
                  <i class="fa fa-map-marker"></i>
                </span>
                <h3 class="title">{{ selected_address.full_name }} {{ selected_address.mobile }}</h3>
                <p class="summary">
                  {{ selected_address.province }}{{ selected_address.city }}{{ selected_address.town }}{{ selected_address.area }}{{ selected_address.street_address }}
                </p>
              </div>
              <div class="action">
                <div class="pull-right">
                  <span class="m-r-15">
                    <i class="fa fa-edit"></i> 编辑
                  </span>
                  <span @click="hook_choose_address">
                    <i class="fa fa-refresh"></i> 重选
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="mx-address--empty" @click="hook_choose_address" v-else>
            <div class="empty-block">
              <i class="fa fa-map-marker"></i> 添加收货地址
            </div>
            <span class="indicator">
              <i class="fa fa-angle-right"></i>
            </span>
          </div>

        </div>
      </div>

      <div class="mx-panel">
        <div class="mx-panel__body is-column">
          <div class="mx-block mx-block--pay">
            <span class="icon">
              <i class="fa fa-wechat"></i>
            </span>
            <label class="title">
              微信支付
            </label>
            <span class="indicator pull-right">
              <input type="radio" name="pay_type" checked="checked">
            </span>
          </div>

          <div class="mx-block mx-block--pay">
            <span class="icon">
              <i class="fa fa-paypal"></i>
            </span>
            <label class="title">
              支付宝
            </label>
            <span class="indicator pull-right">
              <input type="radio" name="pay_type">
            </span>
          </div>
        </div>
      </div>

      <div class="mx-panel">
        <div class="mx-panel__title">
          <label>商品详情</label>
        </div>
        <div class="mx-panel__body is-column">

          <div class="mx-sku" v-for="sku in checkout_skus_data" :key="sku.rid">
            <div class="mx-sku__image">
              <img v-lazy="sku.cover" :alt="sku.product_name" >
            </div>
            <div class="mx-sku__content">
              <h4 class="title">{{ sku.product_name }}</h4>
              <p class="mode">{{ sku.s_model }} {{ sku.s_color }}</p>
              <p class="text-price">
                <span class="currency">￥</span> {{ sku.sale_price }}
              </p>
            </div>
            <div class="mx-sku__quantity">
              <label>x {{ v_sku_quantity(sku.rid) }}</label>
            </div>
          </div>

          <div class="mx-block m-t-15">
            <label class="title">
              买家留言
            </label>
            <div class="summary">
              <div class="mx-input">
                <input class="mx-input__inner" v-model="remark" >
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="mx-panel">
        <div class="mx-panel__body is-column">
          <div class="mx-block mx-block--pay">
            <label class="title">
              优惠码
            </label>
            <span class="indicator pull-right">
              <i class="fa fa-angle-right"></i>
            </span>
          </div>

          <div class="mx-block mx-block--pay">
            <label class="title">
              配送方式
            </label>
            <span class="indicator pull-right">
              快递配送（运费10元）
            </span>
          </div>

          <div class="mx-block mx-block--pay">
            <label class="title">
              送货时间
            </label>
            <span class="indicator pull-right">
              不限送货时间
            </span>
          </div>

          <div class="mx-block mx-block--pay">
            <label class="title">
              发票类型
            </label>
            <span class="indicator pull-right">
              个人电子发票
            </span>
          </div>

        </div>
      </div>

      <div class="mx-panel">
        <div class="mx-panel__title no-border">
          <label>商品总价</label>
          <span class="text-price pull-right">
            ￥ {{ total_amount }}
          </span>
        </div>
        <div class="mx-panel__body is-column">
          <div class="mx-block mx-block--pay">
            <label class="title">
              运费
            </label>
            <span class="indicator text-price pull-right">
              + ￥ {{ freight }}
            </span>
          </div>

          <div class="mx-block mx-block--pay">
            <label class="title">
              优惠
            </label>
            <span class="indicator text-price pull-right">
              - ￥ {{ discount_amount }}
            </span>
          </div>

        </div>
      </div>


    </div>
    <div class="mx-container__footer is_fixed_bottom">
      <label class="text-price">合计：<span class="currency">￥</span>{{ pay_amount }}</label>

      <button class="mx-button mx-button--checkout pull-right" @click="hook_submit_order">
        去支付
      </button>
    </div>
  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'Checkout',
    props: [
      'checkout_skus'
    ],
    data () {
      return {
        flag: true,
        freight: 0,
        remark: '',
        pay_type: 1,
        checkout_skus_data: [],
        total_amount: 0,
        discount_amount: 0,
        selected_address: {},
        new_order: {}
      }
    },
    computed: {
      pay_amount () {
        return (this.total_amount + this.freight) - this.discount_amount
      }
    },
    created () {
      this.get_address();  // 获取默认地址
      this.get_products()
    },
    methods: {
      get_products () {
        const vm = this;
        this.$axiosWrap.get(api.skus, {
          params: { rid: vm.v_join_rid() }
        }).then((result) => {
          if (result.success) {
            vm.checkout_skus_data = result.data
            // 计算商品总和
            for (const sku of vm.checkout_skus_data) {
              vm.total_amount += sku.sale_price * vm.v_sku_quantity(sku.rid)
            }
          }
        }).catch((error) => {
          vm.$message.error(error.status.message)
        })
      },
      get_address () {
        // 已选中地址，则跳过获取默认地址
        if (this.selected_address) {
          console.log('selected address is not empty')
        } else {
          console.log('selected address')
        }
        // 获取默认地址
        const vm = this;
        this.$axiosWrap.get(api.address_default).then((result) => {
          if (result.success) {
            vm.selected_address = result.data
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        });

        return true
      },
      // 选择收货地址
      hook_choose_address () {
        this.$router.push({ name: 'address', params: { checkout_skus: this.checkout_skus } })
      },
      // 提交订单
      hook_submit_order () {
        // 验证是否正在提交
        // if (!this.flag) {
        //    return false
        // }

        // 验证数据
        if (!this.selected_address) {
          return this.$message.error('请先选择收货地址')
        }
        if (!this.checkout_skus) {
          return this.$message.error('请确保已选定商品')
        }

        // 获取默认地址
        const vm = this;
        const post_data = {
          address_rid: this.selected_address.rid,
          freight: this.freight,
          invoice_type: 1,
          buyer_remark: this.remark,
          from_client: 2,
          affiliate_code: '', // 促销优惠码
          items: this.checkout_skus
        };

        // this.flag = false;
        this.$axiosWrap.post(api.order_create, post_data).then((result) => {
          if (result.success) {
            // 提交订单成功
            vm.new_order = result.data;
            // 发起支付请求
            vm.hook_pay_order(vm.new_order.rid)
          } else {
            vm.$message.error(result.status.message)
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        });
        return true
      },
      // 去支付
      hook_pay_order (rid) {
        const vm = this;

        this.$axiosWrap.post(api.order_pay, {
          rid: rid,
          pay_type: this.pay_type
        }).then((result) => {
          if (result.success) {
            // 自动跳转到支付

          } else {
            vm.$message.error(result.status.message)
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        });
      },
      // 私有方法，拼接字符串
      v_join_rid () {
        const rids = [];
        for (const sku of this.checkout_skus) {
          rids.push(sku.rid)
        }
        return rids.join(',')
      },
      // 获取sku购买数量
      v_sku_quantity (rid) {
        for (const sku of this.checkout_skus) {
          if (sku.rid === rid) {
            return sku.quantity
          }
        }
        return 0
      }
    }
  }
</script>

<style scoped>
  .mx-block--pay .title {
    color: #101010;
  }
  .mx-block--pay {
    padding-right: 0;
    padding-left: 0;
  }
  .mx-sku {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    margin-top: 16px;
  }
  .mx-sku__image {
    width: 100px;
    height: 100px;
    flex: 0 0 auto;
  }
  .mx-sku__image img {
    width: 100%;
  }
  .mx-sku__content {
    flex: 1;
    margin-left: 16px;
    line-height: 20px;
  }
  .mx-sku__content .title {
    height: 36px;
  }
  .mx-sku__content .mode {
    font-size: 14px;
    color: #888888;
    margin-bottom: 20px;
  }
  .mx-sku__quantity {
    flex: 0 0 auto;
    line-height: 20px;
  }
  .mx-address--empty {
    line-height: 40px;
    padding: 15px 0;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
  .mx-address--empty .empty-block {
    flex: 1;
  }

  .mx-address__item .indicator,
  .mx-address--empty .indicator {
    flex: 0 0 auto;
    cursor: pointer;
  }

</style>
