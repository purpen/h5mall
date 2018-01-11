<template>
    <div class="mx-container">
    <div class="mx-container__body">
      <el-form ref="form" :model="form" :rules="rules" class="mx-form">
        <el-form-item prop="name" label="姓名" class="mx-form-group">
          <el-input v-model="form.name" placeholder="姓名" clearable></el-input>
        </el-form-item>

        <el-form-item prop="phone" label="联系电话" class="mx-form-group">
          <el-input v-model="form.phone" placeholder="联系电话" clearable></el-input>
        </el-form-item>


        <el-form-item prop="street_address" label="地址" class="mx-form-group">
          <region-picker :data="data"></region-picker>
          <el-input v-model="form.street_address" placeholder="地址" class="m-t-10" clearable></el-input>
        </el-form-item>

        <el-form-item prop="zipcode" label="邮编" class="mx-form-group">
          <el-input v-model="form.zipcode" placeholder="邮编" clearable></el-input>
        </el-form-item>

        <el-switch
          v-model="form.is_default"
          active-color="#13ce66"
          active-text="设为默认地址">
        </el-switch>

        <div class="mx-form__footer is_fixed_bottom">
          <el-button type="primary" class="mix-btn-fluid" @click="handle_submit('form')">
            确认提交
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import api from '@/constant/api';
  import * as types from '@/vuex/types';
  import RegionPicker from 'region-picker'
  import data from '@/data.json'

  export default {
    name: 'AddressAdd',
    data () {
      return {
        data: [],
        form: {
          name: '',
          phone: '',
          street_address: '',
          zipcode: '',
          is_default: false
        },
        rules: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系电话', trigger: 'blur' },
            { type: 'number', min: 11, message: '联系电话格式不对', trigger: 'blur' }
          ],
          street_address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.get_china_map()
    },
    methods: {
      get_china_map () {
        this.data = data
      },
      handle_submit (name) {
        const vm = this;
        this.$refs[name].validate((valid) => {
          if (!valid) {
            return this.$message.error('验证失败')
          }

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
            this.$message.error(error.message);

            this.login_btn_text = '立即登录';
            this.is_click = true;
          });

          return true
        })
      }
    },
    components: {
      RegionPicker
    }
  }
</script>

<style scoped>
  .mx-form {
    background: #ffffff;
    padding: 20px 16px;
  }
  .mx-form__footer {
    width: 100%;
  }
</style>
