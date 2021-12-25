<script>
import {
  Switch,
  Right
} from '@element-plus/icons-vue'
import { reactive } from 'vue'
import store from '@/store'
const sourceOfTruth = reactive(store)
export default {
  data() {
    return {
      fromCity: '南京',
      toCity: '北京',
      date: new Date(),
      airplaneClass: 0,
      flightList: [],
      isSearched: false,
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
      ...sourceOfTruth
    }
  },
  components: {
    Switch,
    Right
  },
  async mounted() {

  },
  methods: {
    switchCity() {
      const toCity = this.toCity;
      this.toCity = this.fromCity;
      this.fromCity = toCity;
      this.ratate = this.ratate + 180;
    },
    async searchFlight() {
      // TODO: 如果用户未完善信息，要求他们先完善信息
      this.isSearched = true;
      this.flightList = [{
        flight_id: 0,
        flight_model: '国泰航空',
        from_city: '南京',
        to_city: '北京',
        from_airport: '禄口国际机场T2',
        to_airport: '大兴国际机场',
        depature_time: '13: 00',
        arrival_time: '15: 00',
        original_price: 349,
        current_price: 1280,
        grade: '经济舱',
        remain_seats: 5,
      }, {
        flight_id: 1,
        flight_model: '国泰航空',
        from_city: '南京',
        to_city: '北京',
        from_airport: '禄口国际机场T2',
        to_airport: '首都国际机场T3',
        depature_time: '14: 00',
        arrival_time: '18: 00',
        original_price: 600,
        current_price: 1580,
        grade: '经济舱',
        remain_seats: 5,
      }]
    },
    async buyTicket() {
      this.$message({
        message: '购买成功',
        type: 'success'
      })
      this.$router.push('/user/order')
    }
  }
}
</script>

<template>
  <div class="user-flight__container">
    <el-card class="box-card box-card__top">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="选择城市" class="choose-city__container" required>
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
        <el-form-item label="出发日期" required>
          <el-date-picker v-model="date" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="经济/公务/头等舱" required>
          <el-select v-model="airplaneClass" placeholder="经济/公务/头等舱">
            <el-option
              v-for="item in airplaneOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出行人" required>
          <el-input v-model="store.username" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="large-button" type="primary" @click="searchFlight">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="isSearched" class="box-card box-card__bottom">
      <p>{{fromCity}} 到 {{toCity}} 查询结果:</p>
      <div v-if="flightList.length > 0">
        <div v-for="(item, index) in flightList" :key="index">
          <div class="flight-item__container">
            <div class="flight-item__left">{{ item.flight_model }}</div>
            <div class="flight-item__middle">
              <div>
                <div class="time">{{ item.depature_time }}</div>
                <div class="airport">{{ item.from_airport }}</div>
              </div>
              <el-icon color="#409eff" :style="{ fontSize: '30px' }">
                <Right />
              </el-icon>
              <div>
                <div class="time">{{ item.arrival_time }}</div>
                <div class="airport">{{ item.to_airport }}</div>
              </div>
            </div>
            <div class="flight-item__right">
              <div class="price">
                <div class="current_price">￥{{ item.current_price }}</div>
                <div class="original_price">￥{{ item.original_price }}</div>
              </div>
              <div class="seats">{{ item.grade }}还剩 {{ item.remain_seats }} 个座位</div>
            </div>
            <div>
              <el-button type="danger" @click="buyTicket">订票</el-button>
            </div>
          </div>
          <el-divider border-style="dashed"></el-divider>
        </div>
      </div>
      <el-empty v-else description="糟糕！查询不到相关航班！"></el-empty>
    </el-card>
  </div>
</template>

<style lang="stylus">
.user-flight__container
  width 100%
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content center
  line-height 18px
  .box-card 
    margin-bottom 15px
    &__top
      width 600px
      padding-right 100px
      .el-form-item__content
        text-align left
      .choose-city__container
        .el-form-item__content
          display flex
          justify-content flex-start
          align-items center
          > *
            margin-right 50px
            text-align left
          .tip
            color #606266
    &__bottom
      width 700px
      .flight-item
        &__container
          display flex
          justify-content space-between
          align-items center
        &__middle
          display flex
          justify-content space-between
          .time
            font-size 30px
            font-weight bold
            line-height 35px
          .airport
            font-size 14px
            color #909399
        &__right
          .price
            display flex
            .current_price
              font-size 20px
              font-weight bold
              color #F56C6C
            .original_price
              margin-left 5px
              font-size 14px
              color #909399
              text-decoration line-through
          .seats
            margin-top 8px
            font-size 13px
            color #909399
</style>
