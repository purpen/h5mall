<template>
  <div v-if="show_header">
    <header class="mix-header">
      <el-row type="flex" class="row-bg">
        <el-col :span="3">{{ title }}</el-col>
        <el-col :span="18">
          <el-input
            size="mini"
            :placeholder="hot_search_words"
            prefix-icon="el-icon-search"
            v-model="query">
          </el-input>
        </el-col>
        <el-col :span="3">
          <div class="mix-news">
            <i class="el-icon-news"></i>
          </div>
        </el-col>
      </el-row>
    </header>
  </div>
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
          return this.$router.history.current.meta.title
        }
      }
    }
</script>

<style scoped>
  .mix-header {
    height: auto;
    padding: 10px 15px;
    line-height: 32px;
  }
  .mix-header .mix-news {
    text-align: center;
    font-size: 14px;
  }
</style>
