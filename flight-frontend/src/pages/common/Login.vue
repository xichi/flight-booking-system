<script>
import { reactive } from 'vue'
import { adminLogin, userLogin, register, checkAuth } from '@/api/common'
import store from '@/store'
const sourceOfTruth = reactive(store)
export default {
  data() {
    return {
      isLogin: true,
      username: '',
      passwd: '',
      checkPasswd: '',
      email: '',
      isAdmin: false,
      ...sourceOfTruth
    }
  },
  methods: {
    async login() {
      let data = {};
      if (this.isAdmin) {
        data = await adminLogin(this.username, this.passwd);
      } else {
        data = await userLogin(this.username, this.passwd);
      }
      const { success, token } = data;
      if (success) {
        this.store.token = token;
        this.store.username = this.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username', this.username);
        this.$router.push(`/${this.isAdmin ? 'admin' : 'user'}/flight`)
      }
    },
    async register() {
      if (this.passwd !== this.checkPasswd) {
        this.$message({
          message: '两次密码不一致',
          type: 'error',
        })
        return;
      }
      const { success, token } = await register(this.username, this.email, this.passwd, this.checkPasswd);
      if (success) {
        this.store.token = token;
        this.store.username = this.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username', this.username);
        this.$router.push('/user/flight')
      }
    },
    clearup() {
      this.username = '';
      this.passwd = '';
      this.checkPasswd = '';
      this.email = '';
    }
  },
  async mounted() {
    if (this.store.token !== '') {
      const { is_admin } = await checkAuth();
      this.$router.push(`/${is_admin ? 'admin' : 'user'}/flight`)
    }
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="box-card">
      <div class="box-card__header">
        <el-radio-group v-model="isLogin" @change="clearup" style="margin-bottom: 20px">
          <el-radio-button :label="true">登录 login</el-radio-button>
          <el-radio-button :label="false">注册 Register</el-radio-button>
        </el-radio-group>
      </div>
      <div class="box-card__main">
        <div v-show="isLogin">
          <el-form label-position="left" label-width="120px">
            <el-form-item label="用户名" required>
              <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="passwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="是否为管理员">
              <el-switch v-model="isAdmin"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button class="large-button" type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="!isLogin">
          <el-form label-position="left" label-width="120px">
            <el-form-item label="邮箱" required>
              <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="用户名" required>
              <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="passwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" required>
              <el-input v-model="checkPasswd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="large-button" type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="stylus" scoped>
.login-container
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  line-height 18px
  .box-card 
    width 480px
    display flex
    flex-direction column
    align-items space-around
    &__main 
      height 300px
.large-button
  width 150px
</style>
