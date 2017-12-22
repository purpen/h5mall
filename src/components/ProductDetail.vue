<template>
  <div class="mix-product-page" ref="product-detail">
    <router-link :to="{ name: 'cart' }" class="mix-btn-cart">
      <i class="el-icon-goods"></i>
    </router-link>

    <div class="mix-product-cover">
      <img v-lazy="product.cover" class="image">
    </div>

    <div class="mix-product-header">
      <h3 class="title">
        {{ product.name }}
      </h3>
      <p class="price">
        ￥ {{ product.sale_price }}
      </p>
    </div>

    <div class="mix-sku-group">
      <span class="fl">已选:</span>

    </div>

    <div class="mix-ship-address">
      <span class="fl">送至:</span>
    </div>

    <div class="mix-product-brand">
      <el-row>
        <el-col :span="15">
          品牌名称
        </el-col>
        <el-col :span="8">
          <i class="el-icon-more"></i>
        </el-col>
      </el-row>
    </div>

    <div class="mix-product-footer">

    </div>

  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'ProductDetail',
    data () {
      return {
        rid: 0,
        product: {}
      }
    },
    created () {
      this.rid = this.$route.params.rid;
      this.get_product()
    },
    methods: {
      // 获取产品信息
      get_product () {
        this.$axiosWrap.get(api.product_detail.replace(/:rid/g, this.rid)).then((result) => {
          if (result.success) {
            this.product = result.data
          }
        }).catch((error) => {
          this.$Message.error(error.status.message)
        })
      },
      // 获取默认地址
      get_default_address () {

      },
      // 获取全部地址
      get_all_addresses () {

      },
      // 加入购物车
      addto_cart () {

      },
      // 立即购买
      quick_buy () {

      }
    }
  }
</script>

<style scoped>
  .mix-product-page {
    position: relative;
  }
  .mix-btn-cart {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 99;
    font-size: 15px;
  }
  .mix-product-page .mix-product-cover img {
    width: 100%;
  }
  .mix-product-header,
  .mix-sku-group,
  .mix-ship-address,
  .mix-product-brand
  {
    padding: 15px;
  }
</style>
