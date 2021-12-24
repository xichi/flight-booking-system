<script>
import {
  Location,
  Ticket,
  Setting,
} from '@element-plus/icons-vue'
import { reactive } from 'vue'
import store from '@/store'
const sourceOfTruth = reactive(store)
export default {
  data() {
    return sourceOfTruth
  },
  components: {
    Location,
    Ticket,
    Setting,
  },
}
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <div class="welcome-banner">
        <p>亲爱的{{ store.username }}</p>
        <p>欢迎使用民航订票系统！</p>
      </div>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <el-icon>
            <Location />
          </el-icon>
          <span>航班信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <Ticket />
          </el-icon>
          <span>订单信息</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <Setting />
          </el-icon>
          <span>用户中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  height: 100vh;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}
</style>
