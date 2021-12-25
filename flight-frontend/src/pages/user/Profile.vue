<script>
import { getUserInfo, updateUserInfo } from '@/api/common'
export default {
  data() {
    return {
      userInfo: {
        user_name: '',
        user_passwd: '',
        user_email: '',
        telephone: 0,
        certification_type: 0,
        certification_number: '',
        sex: 0,
        age: 0,
        address: '',
        balance: 0,
      },
      certType: [
        {
          value: 0,
          label: '身份证',
        },
        {
          value: 1,
          label: '户口簿',
        },
        {
          value: 2,
          label: '护照',
        },
        {
          value: 3,
          label: '港澳台居民居住证',
        },
        {
          value: 4,
          label: '其他',
        },
      ],
    }
  },
  async mounted() {
    const { success, data } = await getUserInfo();
    if (success) {
      this.userInfo = data;
    }
  },
  methods: {
    async updateInfo() {
      const info = { ...this.userInfo };
      const { success } = await updateUserInfo(info);
      this.$message({
        message: `更新${success ? '成功' : '失败'}`,
        type: success ? 'success' : 'danger'
      });
    }
  }
}
</script>

<template>
  <div class="user-profile__container">
    <el-card class="box-card">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="用户名" required>
          <el-input v-model="userInfo.user_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="userInfo.user_passwd" type="password" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required>
          <el-input v-model="userInfo.user_email" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.telephone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="余额（元）">
          <el-input v-model="userInfo.balance" type="number"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select v-model="userInfo.certification_type" placeholder="证件类型">
            <el-option
              v-for="item in certType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="userInfo.certification_number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="large-button" type="primary" @click="updateInfo">更新用户信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="stylus">
.user-profile__container
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  line-height 18px
  .box-card 
    width 700px
    padding-right 100px
  .el-form-item__content
    text-align left
</style>
