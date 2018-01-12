<template>
  <div class="fx-orders__list">
    <fx-order-item
      v-for="order in orders"
      :order="order"
      :key="order.rid"></fx-order-item>
  </div>
</template>

<script>
  import FxOrderItem from '@/components/fx/FxOrderItem'

  export default {
    name: 'fx-order-list',
    props: {
      orders: {
        type: Array,
        required: true
      }
    },
    data () {
      return {}
    },
    components: {
      FxOrderItem
    }
  }
</script>

<style scoped>

</style>
