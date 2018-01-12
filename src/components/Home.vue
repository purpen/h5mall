<template>
  <div class="fx-container">
    <div class="fx-banner">
      <swiper :options="swiper_option">
        <swiper-slide
          v-for="slide in swiper_slides"
          :key="slide.rid">
           <img v-lazy="slide.image" :alt="slide.title" class="image" >
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="fx-label m-b-10">
      <label class="fx-label__item">
        <i class="fx-icon-check-mark"></i> 正品保证
      </label>
      <label class="fx-label__item">
        <i class="fx-icon-check-mark"></i> 七天退换
      </label>
      <label class="fx-label__item">
        <i class="fx-icon-check-mark"></i> 极速退款
      </label>
      <label class="fx-label__item">
        <i class="fx-icon-check-mark"></i> 全场包邮
      </label>
    </div>

    <div class="fx-container__body">

      <div class="fx-panel">
        <div class="fx-panel__title no-border">
          <label>新品上架</label>
          <router-link :to="{ 'name': 'orders' }" class="pull-right">
            查看全部
          </router-link>
        </div>
        <div class="fx-panel__body">
          <div class="fx-products--latest">
            <mx-product
              v-for="(product, index) in newest_products"
              :product="product"
              :key="product.rid"
            >
            </mx-product>
          </div>
        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__title no-border">
          <label>热门品牌</label>
          <router-link :to="{ 'name': 'orders' }" class="pull-right">
            查看全部
          </router-link>
        </div>
        <div class="fx-panel__body">

        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__title no-border">
          <label>热门分类</label>
          <router-link :to="{ 'name': 'orders' }" class="pull-right">
            查看全部
          </router-link>
        </div>
        <div class="fx-panel__body">

        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import api from '@/constant/api'
  import MxProduct from '@/components/block/MxProduct'

  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'Home',
    data() {
      return {
        swiper_option: {
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        },
        swiper_slides: [],
        newest_products: [],
        pagination: {
          page: 1,
          per_page: 10
        }
      }
    },
    computed: {
      is_login () {
        return this.$store.state.token
      },
      title () {
        return this.$router.history.current.meta.title
      }
    },
    created () {
      this.get_slides()
      this.get_products()
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
          this.$message.error(error.message)
        })
      },
      get_slides () {
        const vm = this;
        this.$axiosWrap.get(api.slide_list, {
          params: {
            page: 1,
            per_page: 5,
            spot: 'Ad40563872'
          }
        }).then((result) => {
          if (result.success) {
            vm.swiper_slides = result.data.slides;
          } else {
            vm.$message.error(result.status.message)
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      }
    },
    components: {
      MxProduct
    }
  }
</script>

<style scoped>
  .fx-banner {
    height: 240px;
    background: #fafafa;
    overflow: hidden;
  }
  .fx-banner .swiper-slide .image {
    width: 100%;
    max-height: 240px;
  }
  .fx-label {
    background: #ffffff;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
  }
  .fx-label__item {
    line-height: 40px;
    color: #959595;
    font-size: 12px;
  }
  .fx-label__item i {
    color: #fc5449;
  }

</style>
