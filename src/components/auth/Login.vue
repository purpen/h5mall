<template>
  <div class="fx-container">
    <fx-button-back></fx-button-back>
    <div class="fx-container__body">
      <div class="fx-login-box">
        <Logo></Logo>

        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="account" class="mix-form-group">
            <el-input v-model="form.account" placeholder="账号" clearable></el-input>
          </el-form-item>

          <el-form-item prop="passwd" class="mix-form-group">
            <el-input type="password" v-model="form.passwd"  placeholder="密码" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="mix-btn-fluid" @click="handle_submit('form')">{{ login_btn_text }}</el-button>
          </el-form-item>

          <p class="exist">
            <router-link class="register" to="register">注册</router-link>
            <router-link to="forgot_passwd">忘记密码</router-link>
          </p>

          <div class="third-part">
            <p>第三方账号登录</p>
            <div class="wwq clearfix">
              <a class="wx"></a>
              <a class="wb"></a>
              <a class="qq"></a>
            </div>
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>

  import api from '@/constant/api';
  import * as types from '@/vuex/types';
  import Logo from '@/components/block/Logo';
  import FxHeader from '@/components/block/FxHeader'
  import FxButtonBack from '@/components/fx/FxButtonBack'

  export default {
    name: 'Login',
    data() {
      return {
        login_btn_text: '立即登录',
        is_click: true,
        form: {
          account: '',
          passwd: ''
        },
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { type: 'string', min: 5, message: '请输入正确的E-mail格式', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码最少为6位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handle_submit (name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            return this.$Message.error('验证失败')
          }

          this.login_btn_text = '正在登录...';
          this.is_click = false;

          // 添加axios头部Authorized
          this.$axiosWrap.defaults.auth = {
            username: this.form.account,
            password: this.form.passwd
          };

          this.$axiosWrap.post(api.auth_login).then((result) => {
            if (result.success) {
              // 保存token
              this.$store.commit(types.SET_TOKEN, result.data.token);

              // 清空Authorized设置
              this.$axiosWrap.defaults.auth = {};

              this.$message.success('登录成功');
              this.$router.push('/')
            } else {
              this.login_btn_text = '立即登录';
              this.is_click = true;

              this.$message.error(result.status.message)
            }
          }).catch((error) => {
            this.$message.error(error.status.message);

            this.login_btn_text = '立即登录';
            this.is_click = true;
          });

          return true
        })
      }
    },
    components: {
      Logo,
      FxHeader,
      FxButtonBack
    },
    computed: {
      is_login () {
        return this.$store.state.token !== null
      }
    },
    created () {
      if (this.is_login) {
        this.$message.success('您已登录！');
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .fx-login-box {
    background: #ffffff;
    flex: 1;
    padding: 50px 16px 0;
  }

  .exist {
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .exist a {
    margin-right: 6px;
    padding-right: 10px;
    border-right: 1px solid #999;
  }
  .exist a:last-child {
    border-right: none;
    margin: 0;
    padding: 0;
  }
  .exist .register {
    color: #BE8914;
  }

  .third-part {
    margin-top: 2.3rem;
  }
  .third-part p {
    color: #999;
    font-size: 14px;
    text-align: center;
    margin-bottom: 0.7rem;
  }

  .wwq {
    display: flex;
    justify-content: center;
  }

  .wwq a {
    display: block;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    margin: 0 5%;
    background: #FF4500;
  }

  .wwq .wx {
    background: url(../../assets/images/loginIcon/WeChat@2x.png) no-repeat;
    background-size: contain;
  }

  .wwq .wb {
    background: url(../../assets/images/loginIcon/weibo@2x.png) no-repeat;
    background-size: contain;
  }

  .wwq .qq {
    background: url(../../assets/images/loginIcon/QQ@2x.png) no-repeat;
    background-size: contain;
  }
</style>
