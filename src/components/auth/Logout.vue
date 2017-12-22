<template>
  <div class="alert">
    <p>正在退出...</p>
  </div>
</template>

<script>
    import * as types from '@/vuex/types'

    export default {
      name: 'logout',
      methods: {
        logout () {
          this.$store.commit(types.REVOKE_TOKEN);
          // 返回首页
          this.$router.push('/')
        }
      },
      mounted () {
        this.logout()
      }
    }
</script>

<style scoped>

</style>
