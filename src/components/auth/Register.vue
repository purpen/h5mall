<template>
  <div class="mix-register-box">
    <Logo></Logo>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="account" class="mix-form-group">
        <el-input v-model="form.account" placeholder="账号" clearable></el-input>
      </el-form-item>

      <el-form-item prop="username" class="mix-form-group">
        <el-input v-model="form.username" placeholder="用户名" clearable></el-input>
      </el-form-item>

      <el-form-item prop="passwd" class="mix-form-group">
        <el-input type="password" v-model="form.passwd"  placeholder="密码" clearable></el-input>
      </el-form-item>

      <el-form-item prop="confirm_passwd" class="mix-form-group">
        <el-input type="password" v-model="form.confirm_passwd"  placeholder="确认密码" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="mix-btn-fluid" @click="handle_submit('form')" :disabled="!is_click">{{ register_btn_text }}</el-button>
      </el-form-item>

    </el-form>

    <p class="exist">已有账号？
      <router-link to="login">立即登录</router-link>
    </p>
  </div>
</template>

<script>
  import Logo from '@/components/block/Logo'
  import api from '@/constant/api'

  export default {
    name: 'Register',
    data() {
      const validate_passwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (!/[A-Z]+?/.test(value)) {
          callback(new Error('密码必须有一个大写字母'))
        } else if (!/\d+?/.test(value)) {
          callback(new Error('密码必须有一个数字'))
        } else if (!/[a-z]+?/.test(value)) {
          callback(new Error('密码必须有一个小写字母'))
        }

        return callback()
      };

      const validate_confirm_passwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('再次输入密码'))
        }
        if (value !== this.form.passwd) {
          return callback(new Error('两次密码输入不一致'))
        }
        return callback()
      };

      return {
        register_btn_text: '现在注册',
        is_click: true,
        form: {
          account: '',
          username: '',
          passwd: '',
          confirm_passwd: ''
        },
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { type: 'string', min: 5, message: '请输入正确的E-mail格式', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码最少为6位', trigger: 'blur' },
            { validator: validate_passwd, trigger: 'blur' }
          ],
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          confirm_passwd: [
            { validator: validate_confirm_passwd, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handle_submit (name) {
        this.$refs[name].validate((valid) => {
          if (!valid) {
            return this.$message.error('验证失败')
          }

          this.register_btn_text = '正在提交...';
          this.is_click = false;

          this.$axiosWrap.post(api.auth_register, {
            email: this.form.account,
            password: this.form.passwd,
            username: this.form.username
          }).then((result) => {
            if (result.success) {
              this.$message.success('注册成功');
              // 跳转至登录
              this.$router.push('/login')
            } else {
              this.register_btn_text = '现在注册';
              this.is_click = true;
              this.$message.error(result.status.message)
            }
          }).catch((error) => {
            this.$message.error(error.status.message);

            this.register_btn_text = '现在注册';
            this.is_click = true;
          });

          return true
        })
      }
    },
    components: {
      Logo
    },
    computed: {
      is_login () {
        return this.$store.state.token !== null
      }
    },
    created () {
      if (this.is_login) {
        this.$message.error('您已登录！');
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
