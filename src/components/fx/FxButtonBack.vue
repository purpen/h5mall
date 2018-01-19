<template>
  <button class="fx-button fix-button--text fix-button--back" @click="hook_close_back">
    <i class="fx-icon-nothing-left"></i>
  </button>
</template>

<script>
  export default {
    name: 'FxButtonBack',
    data () {
      return {}
    },
    methods: {
      hook_close_back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .fix-button--back {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 9;
  }
</style>
