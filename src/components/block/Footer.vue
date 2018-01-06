<template>
  <div v-if="show_footer">
    <div class="mix-footer clearfix">
      <router-link :to="{ name: 'home' }" class="icon home">首页</router-link>

      <router-link :to="{ name: 'find' }" class="icon list">分类</router-link>

      <router-link :to="{ name: 'cart' }" class="icon cart">购物车</router-link>

      <router-link :to="{ name: 'user' }" class="icon mine">我的</router-link>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Footer',
      data () {
        return {}
      },
      computed: {
        show_footer () {
          return this.$store.state.layout_config.show_footer
        }
      }
    }
</script>

<style scoped>
  .mix-footer {
    width: 100%;
    position: fixed;
    z-index: 99;
    display: flex;
    bottom: 0;
    left: 0;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    background: #fff;
  }
  .mix-footer .icon {
    flex: 1;
    display: block;
    height: 50px;
    text-indent: -999rem;
    background: #FF4500;
  }

  .mix-footer .home {
    background: url("../../assets/images/icon/home.png") no-repeat center;
    -webkit-background-size: 64px 50.5px;
    background-size: 64px 50.5px;
  }

  .mix-footer .list {
    background: url("../../assets/images/icon/list.png") no-repeat center;
    -webkit-background-size: 64px 50.5px;
    background-size: 64px 50.5px;
  }

  .mix-footer .cart {
    background: url("../../assets/images/icon/cart.png") no-repeat center;
    -webkit-background-size: 64px 50.5px;
    background-size: 64px 50.5px;
  }

  .mix-footer .mine {
    background: url("../../assets/images/icon/mine.png") no-repeat center;
    -webkit-background-size: 64px 50.5px;
    background-size: 64px 50.5px;
  }
</style>
