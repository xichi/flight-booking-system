<script>
import { ORDER_LIST_LARGE } from '@/mock'
export default {
  data() {
    return {
      orderList: []
    }
  },
  async mounted() {
    this.orderList = ORDER_LIST_LARGE;
  }
}
</script>

<template>
  <div class="admin-order__container">
    <el-card class="box-card">
      <el-table :data="orderList" stripe style="width: 100%" max-height="500">
        <el-table-column prop="order_id" label="订单id" fixed width="80" />
        <el-table-column prop="from_city" label="出发城市" width="120" />
        <el-table-column prop="to_city" label="目的地城市" width="120" />
        <el-table-column prop="from_airport" label="出发机场" width="120" />
        <el-table-column prop="to_airport" label="目的地机场" width="120" />
        <el-table-column prop="depature_time" label="出发时间" width="120" />
        <el-table-column prop="arrival_time" label="抵达时间" width="120" />
        <el-table-column prop="user_name" label="用户" width="120" />
        <el-table-column prop="order_time" label="下单时间" width="120" />
        <el-table-column prop="order_price" label="下单价格" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<style lang="stylus">
.admin-order__container
  width 100%
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content center
  .box-card 
    width 90%
    min-height 500px
    line-height 25px
</style>

