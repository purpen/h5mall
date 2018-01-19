<template>
  <div id="app">
    <router-view></router-view>
    <Footer></Footer>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import Footer from '@/components/block/Footer'

  // 导入样式表
  import 'element-ui/lib/theme-chalk/index.css'
  import '@/assets/css/reset.css'
  import '@/assets/css/font-awesome.min.css'
  import '@/assets/css/fineix.css'
  import '@/assets/css/mix.css'
  import '@/assets/css/base.css'

  export default {
    name: 'app',
    data() {
      return {}
    },
    mounted () {
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish()
    },
    created () {
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start();

      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start();
        // continue to next page
        next()
      });

      // hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        console.log('From: ' + from);
        // finish the progress bar
        this.$Progress.finish()
      })
    },
    components: {
      Footer
    }
  }
</script>

<style>

</style>
