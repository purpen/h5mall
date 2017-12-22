<template>
  <div class="mix-container">
    <header class="mix-header">
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <el-button type="text" icon="el-icon-back"></el-button>
        </el-col>
        <el-col :span="18">
          {{ title }}
        </el-col>
        <el-col :span="3">

        </el-col>
      </el-row>
    </header>
    <div class="mix-product-page">
      <div class="mix-cart-empty" v-if="!is_login">
        <p>登录后才能看到购物车商品哦~</p>
        <el-button type="danger" @click="goto" plain>立即登录</el-button>
      </div>

      <div class="mix-cart-list" v-else>
        产品列表
        <div class="mix-cart-item">

        </div>

        <div class="mix-cart-footer">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Cart',
    computed: {
      is_login () {
        return this.$store.state.token !== null
      },
      title () {
        return this.$router.history.current.meta.title
      }
    },
    methods: {
      goto () {
        return this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .mix-header {
    height: auto;
    padding: 10px 15px;
    line-height: 30px;
    background: #ffffff;
  }
  .mix-cart-empty {
    margin: 50px auto;
    text-align: center;
    min-height: 300px;
  }
  .mix-cart-empty p {
    margin: 15px auto;
  }
  .mix-cart-list {
    padding: 0 15px;
    margin: 20px auto;
  }
</style>
