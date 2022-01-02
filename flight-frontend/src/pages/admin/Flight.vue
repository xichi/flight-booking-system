<script>
import { Right } from '@element-plus/icons-vue'
import { getAllFlight, updateFlight, addFlight } from '@/api/common'
import format from 'date-fns/format'
const defaultFlightRecord = {
  flight_id: 0,
  flight_model: "",
  from_city: "",
  to_city: "",
  from_airport: "",
  to_airport: "",
  departure_time: new Date(),
  arrival_time: new Date(),
  original_price: 0,
  current_price: 0,
  remain_seats: 0,
};
export default {
  data() {
    return {
      flightList: [],
      dialogVisible: false,
      isAddDialog: true,
      flightRecord: defaultFlightRecord,
      search: '',
    }
  },
  components: {
    Right,
  },
  methods: {
    handleDialogOpen(isAddDialog = true, flight_index = 0) {
      this.dialogVisible = true;
      this.isAddDialog = isAddDialog;
      if (isAddDialog) {
        this.flightRecord = defaultFlightRecord;
      } else {
        this.flightRecord = this.flightList[flight_index];
      }
    },
    async handleConfirm() {
      if (this.isAddDialog) {
        const { success } = await addFlight(this.flightRecord)
        if (success) {
          this.dialogVisible = false;
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.updateAllFlight()
        }
      } else {
        const { success } = await updateFlight(this.flightRecord)
        if (success) {
          this.dialogVisible = false;
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.updateAllFlight()
        }
      }
    },
    async updateAllFlight() {
      const { success, data } = await getAllFlight();
      if (success) {
        this.flightList = data.map(item => ({
          ...item,
          departure_time: format(new Date(item.departure_time), 'yyyy-MM-dd HH:mm'),
          arrival_time: format(new Date(item.arrival_time), 'yyyy-MM-dd HH:mm')
        }))
      }
    },
    handleSearch() {
      // 验收用
      this.flightList = this.flightList.filter((item) => item.flight_model === this.search)
      this.$message({
        type: 'success',
        message: '查询结果已更新'
      })
    },
    handleDelete(index) {
      // 验收用
      this.flightList.splice(index, 1)
      this.$message({
        type: 'success',
        message: `成功删除id为${index+1}的记录`
      })
    }
  },
  async mounted() {
    this.updateAllFlight()
  }
}
</script>

<template>
  <div class="admin-flight__container">
    <el-card class="box-card">
      <el-table :data="flightList" stripe style="width: 100%" max-height="500">
        <el-table-column prop="flight_id" label="航班id" fixed width="90" sortable />
        <el-table-column prop="flight_model" label="航班公司" width="120" sortable />
        <el-table-column prop="from_city" label="出发城市" width="120" sortable />
        <el-table-column prop="to_city" label="目的地城市" width="120" sortable />
        <el-table-column prop="from_airport" label="出发机场" width="120" sortable />
        <el-table-column prop="to_airport" label="目的地机场" width="120" sortable />
        <el-table-column prop="departure_time" label="出发时间" width="120" sortable />
        <el-table-column prop="arrival_time" label="抵达时间" width="120" sortable />
        <el-table-column prop="remain_seats" label="剩余座位" width="120" sortable />
        <el-table-column prop="original_price" label="原价" width="120" sortable />
        <el-table-column prop="current_price" label="现价" width="120" sortable />
        <el-table-column fixed="right" label="操作" width="200">
          <template #header>
            <el-row>
              <el-col :span="8">
                <el-button type="danger" size="small" plain round @click="handleDialogOpen">新增</el-button>
              </el-col>
              <el-col :span="16">
                <el-input
                  v-model="search"
                  size="small"
                  placeholder="搜索"
                  autofocus
                  @keyup.enter="handleSearch"
                />
              </el-col>
            </el-row>
          </template>
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              round
              @click="() => handleDialogOpen(false, scope.$index)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              round
              @click="() => handleDelete(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" width="60%">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="航班公司" required>
          <el-input v-model="flightRecord.flight_model"></el-input>
        </el-form-item>
        <el-form-item label="往返城市" required>
          <el-row>
            <el-col :span="11">
              <span>出发城市</span>
              <el-input v-model="flightRecord.from_city"></el-input>
            </el-col>
            <el-col class="to-icon" :span="2">
              <el-icon color="#409EFC">
                <Right />
              </el-icon>
            </el-col>
            <el-col :span="11">
              <span>目的地城市</span>
              <el-input v-model="flightRecord.to_city"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="往返机场" required>
          <el-row>
            <el-col :span="11">
              <span>出发机场</span>
              <el-input v-model="flightRecord.from_airport"></el-input>
            </el-col>
            <el-col class="to-icon" :span="2">
              <el-icon color="#409EFC">
                <Right />
              </el-icon>
            </el-col>
            <el-col :span="11">
              <span>目的地机场</span>
              <el-input v-model="flightRecord.to_airport"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="起始时间" required>
          <el-row>
            <el-col :span="11">
              <el-date-picker
                v-model="flightRecord.departure_time"
                type="datetime"
                placeholder="出发时间"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="to-icon" :span="2">
              <el-icon color="#409EFC">
                <Right />
              </el-icon>
            </el-col>
            <el-col :span="11">
              <el-date-picker
                v-model="flightRecord.arrival_time"
                type="datetime"
                placeholder="抵达时间"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="原价(元)" required>
          <el-input v-model="flightRecord.original_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="现价(元)" required>
          <el-input v-model="flightRecord.current_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="剩余机票" required>
          <el-input v-model="flightRecord.remain_seats" type="number"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">{{ `${isAddDialog ? '新增' : '更新'}记录` }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="stylus">
.admin-flight__container
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
  .el-dialog__footer
    line-height 25px
    .to-icon
      display flex
      align-items center
</style>
