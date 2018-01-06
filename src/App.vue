<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/block/Header'
  import Footer from '@/components/block/Footer'

  // 导入样式表
  import 'element-ui/lib/theme-chalk/index.css'
  import '@/assets/css/reset.css'
  import '@/assets/css/font-awesome.min.css'
  import '@/assets/css/mix.css'
  import '@/assets/css/base.css'

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 960px;
  margin: 0 auto;
  background: #fafafa;
  position: relative;
}
</style>
