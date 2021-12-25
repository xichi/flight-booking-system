<script>
import { Right } from '@element-plus/icons-vue'
export default {
  data() {
    return {
      orderList: [],
    }
  },
  components: {
    Right
  },
  async mounted() {
    this.orderList = [{
      flight_id: 0,
      flight_model: '国泰航空',
      from_city: '南京',
      to_city: '北京',
      from_airport: '禄口国际机场T2',
      to_airport: '大兴国际机场',
      depature_time: '13: 00',
      arrival_time: '15: 00',
      order_time: '2021/12/31',
      grade: '经济舱',
      status: '待出行',
      order_price: 349,
      remain_seats: 5,
    }, {
      flight_id: 1,
      flight_model: '国泰航空',
      from_city: '南京',
      to_city: '北京',
      from_airport: '禄口国际机场T2',
      to_airport: '首都国际机场T3',
      grade: '经济舱',
      depature_time: '14: 00',
      arrival_time: '18: 00',
      order_time: '2021/12/31',
      grade: '经济舱',
      status: '已完成',
      order_price: 600,
      remain_seats: 5,
    }];
  },
  methods: {
  }
}
</script>

<template>
  <div class="user-order__container">
    <el-card class="box-card">
      <p class="box-card__header">我的订单：</p>
      <div v-if="orderList.length > 0">
        <div v-for="(item, index) in orderList" :key="index">
          <div class="flight-item__container">
            <div class="flight-item__left">
              <div class="time">{{ item.order_time }}</div>
              <div class="model">{{ item.flight_model }}</div>
            </div>
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
              <div class="price">￥{{ item.order_price }}</div>
              <div class="grade">{{ item.grade }}</div>
            </div>
            <el-button :type="item.status === '待出行' ? 'success' : 'info'" round>{{ item.status }}</el-button>
          </div>
          <el-divider border-style="dashed"></el-divider>
        </div>
      </div>
      <el-empty v-else description="没有查询到您的订单~"></el-empty>
    </el-card>
  </div>
</template>

<style lang="stylus">
.user-order__container
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  line-height 18px
  .box-card 
    width 700px
    &__header
      text-align left
      color #303133
      line-height 50px
    .flight-item
      &__container
        display flex
        justify-content space-between
        align-items center
      &__left
        line-height 25px
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
          font-size 25px
          line-height 30px
          font-weight bold
          color #F56C6C

</style>

