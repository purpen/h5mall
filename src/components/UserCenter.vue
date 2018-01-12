<template>
  <div class="fx-container">
    <div class="fx-container__body is-mine">

      <div class="fx-panel">
        <div class="fx-panel__body">
          <div class="user" v-if="is_login">
            <div class="user-avatar">
              <i class="fx-icon-people"></i>
            </div>
            <div class="user-profile">
              <label>{{ user.username }}</label>
              <p class="is-gift">{{ user.summary }}</p>
            </div>
          </div>

          <div class="user" v-else>
            <div class="user-avatar">
              <i class="fa fa-user"></i>
            </div>
            <div class="user-profile">
              <label>点击头像登录</label>
              <p class="is-gift">注册赢豪礼</p>
            </div>
          </div>
        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__title">
          <label>我的订单</label>
          <router-link :to="{ 'name': 'orders' }" class="pull-right">
            查看全部订单
          </router-link>
        </div>
        <div class="fx-panel__body">
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-wait-pay"></i>
            待付款
          </router-link>
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-wait-send"></i>
            待发货
          </router-link>
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-wait-confirm"></i>
            待收货
          </router-link>
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-order"></i>
            售后服务
          </router-link>
        </div>
      </div>

      <div class="fx-panel is-u1of4">
        <div class="fx-panel__title">
          <label>我的服务</label>
        </div>
        <div class="fx-panel__body">
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-like"></i>
            心愿单
          </router-link>
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-red-packets "></i>
            红包
          </router-link>
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-gift is-gift"></i>
            礼物
          </router-link>

          <router-link :to="{ 'name': 'address' }" class="item">
            <i class="fx-icon-address"></i>
            地址
          </router-link>
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-dialogbox"></i>
            意见反馈
          </router-link>
          <router-link :to="{ 'name': 'orders' }" class="item">
            <i class="fx-icon-mation-prompt"></i>
            关于我们
          </router-link>
        </div>
      </div>

      <div class="fx-panel">
        <div class="fx-panel__title">
          <label>猜你喜欢</label>
        </div>
        <div class="fx-panel__body">
          <div class="container-placeholder">
            正在加载中...
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import api from '@/constant/api'

  export default {
    name: 'UserCenter',
    data () {
      return {
        user: {}
      }
    },
    computed: {
      is_login () {
        return this.$store.state.token
      },
      title () {
        return '我的'
      }
    },
    mounted () {
      this.get_profile()
    },
    methods: {
      get_profile () {
        const vm = this;
        this.$axiosWrap.get(api.user).then((result) => {
          if (result.success) {
            this.user = result.data
          }
        }).catch((error) => {
          vm.$message.error(error.message)
        })
      }
    }
  }
</script>

<style scoped>
  .fx-container__body.is-mine {
    background: #efeef4;
    flex-direction: column;
  }
  .is-gift {
    color: #fc5449;
  }

  .user {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
  }
  .user-avatar {
    font-size: 70px;
    color: #d5d5d5;
    width: 80px;
    height: 70px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
  }
  .user-profile {
    margin-left: 16px;
    line-height: 22px;
    margin-top: 20px;
  }
  .user-profile label {
    font-size: 16px;
  }
  .user-profile p {
    font-size: 12px;
  }

  .container-placeholder {
    text-align: center;
    padding: 100px 0;
    color: #d5d5d5;
  }
</style>
