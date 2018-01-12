<template>
  <div class="fx-container">
    <div class="fx-container__body">
      <div class="fx-panel">
        <div class="fx-panel__body">

          <div class="fx-address" v-if="selected_address">
            <div class="fx-address__item">
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

          <div class="fx-address--empty" @click="hook_choose_address" v-else>
            <div class="empty-block">
              <i class="fa fa-map-marker"></i> 添加收货地址
            </div>
            <span class="indicator">
              <i class="fa fa-angle-right"></i>
            </span>
          </div>

        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__body is-column">
          <div class="fx-block mx-block--pay">
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

          <div class="fx-block mx-block--pay">
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

      <div class="fx-panel">
        <div class="fx-panel__title">
          <label>商品详情</label>
        </div>
        <div class="fx-panel__body is-column">

          <div class="fx-sku" v-for="sku in checkout_skus_data" :key="sku.rid">
            <div class="fx-sku__image">
              <img v-lazy="sku.cover" :alt="sku.product_name" >
            </div>
            <div class="fx-sku__content">
              <h4 class="title">{{ sku.product_name }}</h4>
              <p class="mode">{{ sku.s_model }} {{ sku.s_color }}</p>
              <p class="text-price">
                <span class="currency">￥</span> {{ sku.sale_price }}
              </p>
            </div>
            <div class="fx-sku__quantity">
              <label>x {{ v_sku_quantity(sku.rid) }}</label>
            </div>
          </div>

          <div class="fx-block m-t-15">
            <label class="title">
              买家留言
            </label>
            <div class="summary">
              <div class="fx-input">
                <input class="fx-input__inner" v-model="remark" >
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__body is-column">
          <div class="fx-block mx-block--pay">
            <label class="title">
              优惠码
            </label>
            <span class="indicator pull-right">
              <i class="fa fa-angle-right"></i>
            </span>
          </div>

          <div class="fx-block mx-block--pay">
            <label class="title">
              配送方式
            </label>
            <span class="indicator pull-right">
              快递配送（运费10元）
            </span>
          </div>

          <div class="fx-block mx-block--pay">
            <label class="title">
              送货时间
            </label>
            <span class="indicator pull-right">
              不限送货时间
            </span>
          </div>

          <div class="fx-block mx-block--pay">
            <label class="title">
              发票类型
            </label>
            <span class="indicator pull-right">
              个人电子发票
            </span>
          </div>

        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__title no-border">
          <label>商品总价</label>
          <span class="text-price pull-right">
            ￥ {{ total_amount }}
          </span>
        </div>
        <div class="fx-panel__body is-column">
          <div class="fx-block mx-block--pay">
            <label class="title">
              运费
            </label>
            <span class="indicator text-price pull-right">
              + ￥ {{ freight }}
            </span>
          </div>

          <div class="fx-block mx-block--pay">
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
    <div class="fx-container__footer is_fixed_bottom">
      <label class="text-price">合计：<span class="currency">￥</span>{{ pay_amount }}</label>

      <button class="fx-button mx-button--checkout pull-right" @click="hook_submit_order">
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
        pay_params: {},
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
          items: this.checkout_skus,
          sync_pay: 1  // 同步返回支付参数
        };

        // this.flag = false;
        this.$axiosWrap.post(api.order_create, post_data).then((result) => {
          if (result.success) {
            // 提交订单成功
            vm.new_order = result.data.order;
            vm.pay_params = result.data.pay_params;
            // 发起支付请求
            vm.hook_pay_order()
          } else {
            vm.$message.error(result.status.message)
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        });
        return true
      },
      // 去支付
      hook_pay_order () {
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady());
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady())
          }
        } else {
          this.onBridgeReady()
        }
      },
      onBridgeReady () {
        const openId = localStorage.getItem('openId');
        const vm = this;

        // 自动跳转到支付
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            appId: vm.pay_params.appId,
            timeStamp: vm.pay_params.timeStamp,
            nonceStr: vm.pay_params.nonceStr,
            package: vm.pay_params.package,
            signType: vm.pay_params.signType,
            paySign: vm.pay_params.sign
          }, (res) => {
            console.log(res);
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              vm.$message.success('微信支付成功');
              // 跳转到订单详情
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              vm.$message.error('用户取消支付');
            } else {
              vm.$message.error('网路异常，请重试！');
            }
          })
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
  .fx-block--pay .title {
    color: #101010;
  }
  .fx-block--pay {
    padding-right: 0;
    padding-left: 0;
  }

  .fx-address--empty {
    line-height: 40px;
    padding: 15px 0;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
  .fx-address--empty .empty-block {
    flex: 1;
  }

  .fx-address__item .indicator,
  .fx-address--empty .indicator {
    flex: 0 0 auto;
    cursor: pointer;
  }

</style>
