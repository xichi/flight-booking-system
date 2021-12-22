<script setup>
import { defineComponent, ref } from 'vue'
import {
  Location,
  Avatar,
  Ticket,
  Setting,
} from '@element-plus/icons-vue'

defineProps({
  msg: String
})
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <div class="welcome-banner">欢迎使用民航订票系统！</div>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <el-icon>
            <location />
          </el-icon>
          <span>航班信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <ticket />
          </el-icon>
          <span>订单信息</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <setting />
          </el-icon>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>Main</el-main>
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

.welcome-banner {
  line-height: 60px;
}
</style>
