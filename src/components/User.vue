<template>
    <div id="user">
      User {{ id }}
      <router-view></router-view>
    </div>
</template>

<script>
    import api from '@/constant/api';

    export default {
      name: 'user',
      props: ['id'],
      data () {
        return {}
      },
      mounted () {
        this.getProfile()
      },
      methods: {
        getProfile () {
          this.$axiosWrap.get(api.user).then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>

</style>
