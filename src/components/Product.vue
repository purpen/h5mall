<template>
  <div class="fx-container">

    <div class="fx-container__menu">
      <ul class="list">
        <li
          class="item"
          v-for="category in categories"
          :key="category.id"
          @click="hook_sub_category(category.id)"
          :class="{ active: is_active(category.id) }">
            <span>{{ category.name }}</span>
        </li>
      </ul>
    </div>

    <div class="fx-container__body">
      <div class="fx-products--category">
        <mx-product
          v-for="(product, index) in category_products"
          :product="product"
          :key="product.rid"
        >
        </mx-product>
      </div>

    </div>
  </div>
</template>

<script>
  import api from '@/constant/api'
  import MxProduct from '@/components/block/MxProduct'

  export default {
    name: 'Product',
    data () {
      return {
        cid: 0,
        pid: 0,
        categories: [],
        category_products: [],
        pagination: {
          page: 1,
          per_page: 10
        }
      }
    },
    created () {
      this.cid = this.$route.params.cid;
      this.pid = this.$route.params.pid;
      this.get_categories();
      this.get_products()
    },
    methods: {
      // 获取同级分类
      get_categories () {
        const vm = this;
        this.$Progress.start();
        this.$axiosWrap.get(api.categories, { params: { pid: this.pid } }).then((result) => {
          vm.$Progress.finish();
          if (result.success) {
            vm.categories = result.data.categories
          }
        }).catch((error) => {
          vm.$Progress.fail();
          vm.$message.error(error.message)
        })
      },
      get_products () {
        const vm = this;
        this.$axiosWrap.get(api.products, {
          params: {
            cid: this.cid,
            page: this.pagination.page,
            per_page: this.pagination.per_page
          }
        }).then((result) => {
          if (result.success) {
            vm.category_products = result.data.products;
          } else {
            vm.$message.error(result.status.message)
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      },
      hook_sub_category (cid) {
        this.cid = cid;
        this.get_products()
      },
      is_active (cid) {
        return cid === this.cid
      }
    },
    components: {
      MxProduct
    }
  }
</script>

<style scoped>
  .fx-products--category {
    padding: 30px 16px 50px;
  }

</style>
