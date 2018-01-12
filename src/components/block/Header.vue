<template>
  <header class="fx--header" v-if="show_header">
    <div class="left-side"></div>
    <div class="site-name">
      {{ title }}
    </div>
    <div class="right-side"></div>
  </header>
</template>

<script>
    export default {
      name: 'Header',
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
          if (this.$router.history.current.meta.title) {
            return this.$router.history.current.meta.title
          }
          return this.$store.state.title
        }
      }
    }
</script>

<style scoped>
  .fx-header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ededed;
  }
  .fx-header .site-name {
    text-align: center;
    font-size: 14px;
  }
</style>
