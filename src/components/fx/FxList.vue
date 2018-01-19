<template>
  <ul class="fx-list">
    <li
      class="item"
      v-for="(tab, idx) in tabs"
      @click="hook_click_tab(idx)"
      :class="{ active: is_actived(tab.id) }"
      :key="tab.id">
      {{ tab.name }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'FxList',
    props: {
      tabs: {
        type: Array,
        required: true
      },
      active_item: ''
    },
    data () {
      return {
        active_index: 0
      }
    },
    created () {
      const vm = this;
      console.log('active item: ' + this.active_item);
      this.tabs.forEach((item, idx) => {
        if (item.id === vm.active_item) {
          vm.active_index = idx
        }
      })
    },
    methods: {
      hook_click_tab (index) {
        this.active_index = index;
        this.$emit('click', index)
      },
      is_actived (id) {
        return this.active_item === id
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
