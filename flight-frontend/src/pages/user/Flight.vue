<script>
import {
  Switch
} from '@element-plus/icons-vue'
export default {
  data() {
    return {
      fromCity: '南京',
      toCity: '上海',
      date: new Date(),
      airplaneClass: 0,
      airplaneOption: [
        {
          value: 0,
          label: '头等舱',
        },
        {
          value: 1,
          label: '商务舱',
        },
        {
          value: 2,
          label: '经济舱',
        },
      ],
      ratate: 0,
    }
  },
  components: {
    Switch,
  },
  async mounted() {

  },
  methods: {
    switchCity() {
      const toCity = this.toCity;
      this.toCity = this.fromCity;
      this.fromCity = toCity;
      this.ratate = this.ratate + 180;
    }
  }
}
</script>

<template>
  <div class="user-flight__container">
    <el-card class="box-card">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="选择城市" class="choose-city__container">
          <div>
            <span class="tip">出发城市</span>
            <el-input v-model="fromCity"></el-input>
          </div>
          <el-icon
            clss="switch-button"
            color="#409eff"
            :style="{ fontSize: '30px', cursor: 'pointer', transition: '0.8s all ease', transform: `rotate(${ratate}deg)` }"
            @Click="switchCity"
          >
            <Switch />
          </el-icon>
          <div>
            <span class="tip">目的地城市</span>
            <el-input v-model="toCity"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="出发日期">
          <el-date-picker v-model="date" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="经济/公务/头等舱">
          <el-select v-model="airplaneClass" placeholder="经济/公务/头等舱">
            <el-option
              v-for="item in airplaneOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="large-button" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="stylus">
.user-flight__container
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  line-height 18px
  .box-card 
    width 600px
    padding-right 100px
    .el-form-item__content
      text-align left
    .choose-city__container
      .el-form-item__content
        display flex
        justify-content space-between
        align-items center
        > *
          margin-left 50px
          text-align left
        .tip
          color #606266
</style>
