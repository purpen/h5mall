<template>
  <footer class="fx-footer" v-if="show_footer">
    <label
      @click="hook_menu_click('home')"
      :class="{ active: is_actived(0)}"
      class="main-menu">
      <i class="fx-icon-home fx-2x"></i>
      <span>首页</span>
    </label>

    <label
      @click="hook_menu_click('find')"
      :class="{ active: is_actived(1)}"
      class="main-menu">
      <i class="fx-icon-classify fx-2x"></i>
      <span>分类</span>
    </label>

    <label
      @click="hook_menu_click('cart')"
      :class="{ active: is_actived(2)}"
      class="main-menu">
      <i class="fx-icon-cart fx-2x"></i>
      <span class="fx-badge">
        购物车
        <span
          class="fx-badge__content is-fixed"
          v-if="cart_total_count">
          {{ cart_total_count }}
        </span>
      </span>
    </label>

    <label
      @click="hook_menu_click('user')"
      :class="{ active: is_actived(3)}"
      class="main-menu">
      <i class="fx-icon-personal-center fx-2x"></i>
      <span>我的</span>
    </label>
  </footer>
</template>

<script>
    import * as types from '@/vuex/types'

    export default {
      name: 'Footer',
      data () {
        return {
          actived_index: 0
        }
      },
      computed: {
        show_footer () {
          return this.$store.state.layout_config.show_footer
        },
        cart_total_count () {
          return this.$store.state.cart.total_count
        }
      },
      methods: {
        hook_menu_click (name) {
          if (name === 'user') {
            this.actived_index = 3
          } else if (name === 'cart') {
            this.actived_index = 2
          } else if (name === 'find') {
            this.actived_index = 1
          } else {
            this.actived_index = 0
          }

          this.$store.commit(types.UPDATE_MENU_INDEX, this.actived_index);

          this.$router.push({ name: name })
        },
        is_actived (index) {
          return this.$store.state.menu_active_index === index
        }
      }
    }
</script>

<style scoped>
  .fx-footer {
    background: #fff;
    border-top: 1px solid #d5d5d5;
    display: -webkit-flex;
    display: flex;
    flex: 1;
    width: 100%;
    position: fixed;
    z-index: 9;
    bottom: 0;
    left: 0;
  }
  .fx-footer .main-menu {
    flex: 1;
    height: 50px;
    color: #959595;
    font-size: 12px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .fx-footer .main-menu i {
    margin-bottom: 5px;
    font-size: 16px;
  }
  .fx-footer .main-menu.active {
    color: #FF4500;
  }
  .fx-footer .main-menu .fx-badge__content.is-fixed {
    top: -15px;
    right: 10px;
  }
</style>
