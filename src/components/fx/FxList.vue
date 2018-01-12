<template>
  <ul class="fx-list">
    <li
      v-for="(tab, index) in tabs"
      @click="hook_click_tab(index)"
      :class="{ active: is_actived(index) }"
      class="item">
      {{ tab.name }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'fx-list',
    props: {
      tabs: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        index: 0
      }
    },
    methods: {
      hook_click_tab (index) {
        this.index = index;
        console.log('click tab: ' + this.index);
        this.$emit('click', index)
      },
      is_actived (index) {
        return this.index === index
      }
    }
  }
</script>

<style scoped>
.fx-list {
  display: -webkit-flex;
  display: flex;
  padding-left: 16px;
  justify-content: flex-start;
}
.fx-list .item {
  flex: 0 0 auto;
  line-height: 40px;
  margin-right: 30px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.fx-list .item.active {
  border-bottom-color: #fc5449;
  color: #fc5449;
  margin-bottom: -1px;
}
</style>
