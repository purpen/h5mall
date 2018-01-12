<template>
  <router-link :to="{ name:'product', params: { rid: product.rid }}" class="fx-product is-u1of2">
    <div class="fx-product__image">
      <img v-lazy="product.cover">
    </div>
    <p class="fx-product__subtitle">{{ product.advantage }}</p>
    <h3 class="fx-product__title">{{ product.name }}</h3>
    <span class="fx-product__sale-price">￥{{ product.sale_price }}</span>
    <span class="fx-product__price">{{ product.price }}</span>
  </router-link>
</template>

<script>
  export default {
    name: 'MxProduct',
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .fx-product {
    flex: 0 0 auto;
    margin-bottom: 30px;
  }
  .fx-product.is-u1of2 {
    flex: 0 0 50%;
  }
  .fx-product.is-u1of3 {
    flex: 0 0 33.3333%;
  }
  .fx-product.is-u1of4 {
    flex: 0 0 25%;
  }
  .fx-product__image {
    text-align: center;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .fx-product__image img {
    width: 100%;
    max-width: 440px;
    max-height: 440px;
  }
  .fx-product__title {
    color: #101010;
    line-height: 30px;
  }
  .fx-product__subtitle {
    color: #fe9b35;
    line-height: 30px;
  }
  .fx-product__sale-price {
    color: #fc5449;
    margin-top: 15px;
  }
  .fx-product__price {

  }
</style>
