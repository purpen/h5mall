<template>
    <div id="user">
      User {{ user.username }}

      <router-link :to="{ name:'logout' }">
        Log Out
      </router-link>
      <router-view></router-view>
    </div>
</template>

<script>
    import api from '@/constant/api';

    export default {
      name: 'user',
      props: ['id'],
      data () {
        return {
          user: {}
        }
      },
      mounted () {
        this.getProfile()
      },
      methods: {
        getProfile () {
          this.$axiosWrap.get(api.user).then((result) => {
            if (result.success) {
              this.user = result.data
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>

</style>
