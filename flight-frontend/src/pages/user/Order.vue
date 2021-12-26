<script>
import { Right } from '@element-plus/icons-vue'
import { ORDER_LIST } from '@/mock'
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
    this.orderList = ORDER_LIST;
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

