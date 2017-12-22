<template>
  <div class="mix-home-main">
    <div class="mix-banner">

    </div>

    <div class="mix-newest-products">
      <h4 class="block-title">最新产品</h4>

      <el-row :gutter="15" v-if="newest_products.length" class="mix-products">
        <el-col :span="12" v-for="(product, index) in newest_products" :key="product.rid">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <router-link :to="{ name:'product', params: { rid: product.rid }}">
              <img v-lazy="product.cover" class="image">
            </router-link>
            <div style="padding: 14px;">
              <span>{{ product.name }}</span>
              <div class="bottom clearfix">
                <span class="price">{{ product.sale_price }}</span>
                <el-button type="text" class="button">购买</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'Home',
    data() {
      return {
        newest_products: [],
        pagination: {
          page: 1,
          per_page: 10
        }
      }
    },
    computed: {

    },
    methods: {
      get_products () {
        this.$axiosWrap.get(api.products, {
          page: this.pagination.page,
          per_page: this.pagination.per_page
        }).then((result) => {
          if (result.success) {
            this.newest_products = result.data.products;
          } else {
            this.$message.error(result.status.message)
          }
        }).catch((error) => {
          this.$message.error(error.status.message)
        })
      }
    },
    created () {
      this.get_products()
    },
    mounted () {

    }
  }
</script>

<style scoped>
  .mix-banner {
    min-height: 240px;
    background: #fafafa;
  }
  .mix-newest-products {
    padding: 15px;
  }
  .mix-newest-products .block-title {
    font-weight: 500;
  }
  .mix-products {
    margin-top: 15px;
  }
  .mix-products .card {
    margin-bottom: 15px;
  }
  .mix-products .image {
    width: 100%;
    height: 150px;
    display: block;
    overflow: hidden;
  }
  .mix-products .price {
    font-size: 13px;
    color: #f60;
  }
  .mix-products .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .mix-products .button {
    padding: 0;
    float: right;
  }

</style>
