<template>
  <div class="fx-container">

    <div class="fx-search">
      <div class="fx-input fx-input--prefix fx-input--mini">
        <input type="search" class="fx-input__inner fx-input--search" placeholder="智能牙刷 | 化妆镜" />
        <span class="fx-input__prefix">
          <i class="fa fa-search"></i>
        </span>
      </div>
    </div>

    <div class="fx-container__body is-category">
      <div class="fx-container__nav">
          <ul class="fx-list">
            <li
              v-for="category in top_categories"
              @click="hook_top_category(category.id)"
              :key="category.id"
              :class="[{ active: is_active(category.id) }, default_class]">
                <span>{{ category.name }}</span>
            </li>
          </ul>
      </div>
      <div class="fx-container__content">
        <div class="fx-adv">
          广告位
        </div>
        <div class="fx-category">
          <h3 class="category-title">{{ current_category.name }}</h3>
          <div class="fx-category__list">
            <router-link
              v-for="child_category in children_categories"
              :key="child_category.id"
              :to="{ 'name': 'products', 'params': { 'pid': current_pid , 'cid': child_category.id } }"
              class="fx-category__item">
                <div class="image">
                  <img v-lazy="child_category.cover" :alt="child_category.name" >
                </div>
                <h4 class="name">{{ child_category.name }}</h4>
            </router-link>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'Find',
    data () {
      return {
        current_pid: 0,
        current_category: {},
        default_class: 'item',
        top_categories: [],
        children_categories: [],
        default_image: 'http://127.0.0.1:5000/_uploads/photos/171228/67a86ca36b30ec7.jpg'
      }
    },
    computed: {
      is_login () {
        return this.$store.state.token
      }
    },
    mounted () {
      this.get_top_categories()
    },
    methods: {
      get_top_categories () {
        const vm = this;
        this.$axiosWrap.get(api.categories).then((result) => {
          if (result.success) {
            vm.top_categories = result.data.categories;
            // 默认设置第一个
            vm.current_pid = vm.top_categories[0].id;
            vm.current_category = vm.top_categories[0];

            vm.get_children_categories()
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      },
      get_children_categories () {
        if (this.current_pid) {
          const vm = this;
          this.$axiosWrap.get(api.categories, { params: { pid: vm.current_pid } }).then((result) => {
            if (result.success) {
              vm.children_categories = result.data.categories
            }
          }).catch((error) => {
            vm.$message.error(error.message)
          })
        }
      },
      hook_top_category (cid) {
        // 设置当前分类
        this.current_pid = cid;
        for (const category of this.top_categories) {
          if (category.id === this.current_pid) {
            this.current_category = category
          }
        }

        this.get_children_categories()
      },
      is_active (pid) {
        return this.current_pid === pid
      }
    }
  }
</script>

<style scoped>
  .fx-search {
    background: #ffffff;
    border-bottom: 1px solid #d5d5d5;
    padding: 10px 16px;
    flex: 0 0 auto;
  }
  .fx-container__body.is-category {
    flex-direction: row;
  }
  .fx-container__nav {
    background: #ffffff;
    flex: 0 0 6.5em;
    border-right: 1px solid #d5d5d5;
    padding-top: 20px;
  }
  .fx-container__content {
    background: #ffffff;
    flex: 1;
    padding: 20px;
  }
  .fx-adv {
    height: 120px;
    background: #fafafa;
    text-align: center;
  }
  .fx-category .category-title {
    margin: 20px auto;
    color: #959595;
  }
  .fx-category__list {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .fx-category__item {
    flex: 0 0 33.3333%;
    margin-bottom: 15px;
    text-align: center;
  }
  .fx-category__item .image {
    height: 60px;
    width: 60px;
    overflow: hidden;
    margin: 0 auto;
  }
  .fx-category__item .image img {
    width: 100%;
  }
  .fx-category__item .name {
    line-height: 40px;
  }

  .fx-list .item {
    border-left: 4px solid transparent;
    padding-left: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .fx-list .item.active {
    border-left-color: #fc5449;
  }



</style>
