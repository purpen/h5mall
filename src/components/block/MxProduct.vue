<template>
  <router-link :to="{ name:'product', params: { rid: product.rid }}" class="mx-product is-u1of2">
    <div class="mx-product__image">
      <img v-lazy="product.cover">
    </div>
    <p class="mx-product__subtitle">{{ product.advantage }}</p>
    <h3 class="mx-product__title">{{ product.name }}</h3>
    <span class="mx-product__sale-price">￥{{ product.sale_price }}</span>
    <span class="mx-product__price">{{ product.price }}</span>
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
  .mx-product {
    flex: 0 0 auto;
    margin-bottom: 30px;
  }
  .mx-product.is-u1of2 {
    flex: 0 0 50%;
  }
  .mx-product.is-u1of3 {
    flex: 0 0 33.3333%;
  }
  .mx-product.is-u1of4 {
    flex: 0 0 25%;
  }
  .mx-product__image {
    text-align: center;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .mx-product__image img {
    width: 100%;
    max-width: 440px;
    max-height: 440px;
  }
  .mx-product__title {
    color: #101010;
    line-height: 30px;
  }
  .mx-product__subtitle {
    color: #fe9b35;
    line-height: 30px;
  }
  .mx-product__sale-price {
    color: #fc5449;
    margin-top: 15px;
  }
  .mx-product__price {

  }
</style>
