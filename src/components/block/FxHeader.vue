<template>
  <header class="fx-header" v-if="show_header">
    <div class="left-sider">
      <slot name="left-sider">
        <label class="action" @click="hook_go_back" v-if="show_back">
          <i class="fx-icon-nothing-left"></i>
        </label>
      </slot>
    </div>
    <div class="site-name">
      {{ title }}
    </div>
    <div class="right-sider">
      <slot name="right-sider"></slot>
    </div>
  </header>
</template>

<script>
    export default {
      name: 'FxHeader',
      props: {
        show_back: {
          type: Boolean,
          default () {
            return false
          }
        }
      },
      data() {
        return {
          hot_search_words: '智能牙刷 | 化妆镜',
          query: ''
        }
      },
      computed: {
        show_header () {
          return this.$store.state.layout_config.show_header
        },
        title () {
          return this.$store.state.title
        }
      },
      methods: {
        hook_go_back () {
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .fx-header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ededed;
    position: relative;
  }
  .fx-header .left-sider,
  .fx-header .right-sider {
    position: absolute;
    top: 0;
    z-index: 8;
  }
  .fx-header .left-sider {
    left: 16px;
  }
  .fx-header .right-sider {
    right: 16px;
  }
  .fx-header .site-name {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    flex: 1;
  }
</style>
