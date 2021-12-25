<script>
export default {
  data() {
    return {
      username: '',
      passwd: '',
      checkPasswd: '',
      email: '',
      certification_type: 0,
      certification_number: '',
      telephone: 0,
      sex: 0,
      age: 0,
      address: '',
      balance: 0,
    }
  },
  async mounted() {
    
  }
}
</script>

<template>
  <div class="user-profile__container">
    <el-card class="box-card">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="用户名" required>
          <el-input v-model="username" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="passwd" type="password" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required>
          <el-input v-model="email" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="telephone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="sex"></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="balance"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="address"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-input v-model="certification_type"></el-input>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="certification_number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="large-button" type="primary">更新用户信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="stylus" scoped>
.user-profile__container
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  line-height 18px
  .box-card 
    width 800px
</style>
