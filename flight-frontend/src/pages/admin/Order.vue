<script>
import { format } from 'date-fns'
import { getAllOrder } from '@/api/common'
export default {
  data() {
    return {
      orderList: [],
      search: ''
    }
  },
  methods: {
    handleSearch() {
      // 验收用
      this.orderList = this.orderList.filter((item) => item.user_name === this.search)
      this.$message({
        type: 'success',
        message: '查询结果已更新'
      })
    }
  },
  async mounted() {
    const { success, data } = await getAllOrder();
    if (success) {
      this.orderList = data.map(item => ({
        ...item,
        from_city: item.flight.from_city,
        to_city: item.flight.to_city,
        from_airport: item.flight.from_airport,
        to_airport: item.flight.to_airport,
        status: item.check_status,
        departure_time: format(new Date(item.flight.departure_time), 'yyyy-MM-dd HH:mm'),
        arrival_time: format(new Date(item.flight.arrival_time), 'yyyy-MM-dd HH:mm'),
        order_time: format(new Date(item.order_time), 'yyyy-MM-dd HH:mm'),
        user_name: item.sys_user.user_name,
      }));
    }
  }
}
</script>

<template>
  <div class="admin-order__container">
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <el-input
            v-model="search"
            size="medium"
            placeholder="搜索用户"
            autofocus
            @keyup.enter="handleSearch"
          />
        </el-col>
      </el-row>
      <el-table :data="orderList" stripe style="width: 100%" max-height="500" sortable>
        <el-table-column prop="order_id" label="订单id" fixed width="100" sortable />
        <el-table-column prop="from_city" label="出发城市" width="120" sortable />
        <el-table-column prop="to_city" label="目的地城市" width="120" sortable />
        <el-table-column prop="from_airport" label="出发机场" width="120" sortable />
        <el-table-column prop="to_airport" label="目的地机场" width="120" sortable />
        <el-table-column prop="departure_time" label="出发时间" width="120" sortable />
        <el-table-column prop="arrival_time" label="抵达时间" width="120" sortable />
        <el-table-column prop="user_name" label="用户" width="120" sortable />
        <el-table-column prop="order_time" label="下单时间" width="120" sortable />
        <el-table-column prop="order_price" label="下单价格" width="120" sortable />
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

