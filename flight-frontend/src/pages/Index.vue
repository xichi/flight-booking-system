<script>
import {
  Location,
  Ticket,
  Setting,
} from '@element-plus/icons-vue'
import { checkAuth } from '@/api/common'
import { reactive } from 'vue'
import store from '@/store'
const sourceOfTruth = reactive(store)
export default {
  data() {
    return {
      currentIndex: 'flight',
      ...sourceOfTruth
    }
  },
  components: {
    Location,
    Ticket,
    Setting,
  },
  methods: {
    signout() {
      this.store.token = '';
      this.store.username = '';
      localStorage.setItem('token', '');
      localStorage.setItem('username', '');
      this.$router.push('/login')
    },
    async changeRouter(route) {
      if (this.store.token !== '') {
        const { is_admin } = await checkAuth();
        this.store.is_admin = is_admin
        this.$router.push(`/${is_admin ? 'admin' : 'user'}/${route}`)
      } else {
        this.$message({
          message: '请先登录',
          type: 'error',
        });
        this.$router.push('/login')
      }
    },
  },
  async mounted() {
    let path = this.$route.path.match(/\/\w*$/g)[0];
    path = path === '/' ? '/flight' : path;
    this.currentIndex = path.slice(1);
    if (this.store.token !== '') {
      const { is_admin } = await checkAuth();
      this.store.is_admin = is_admin
      this.$router.push(`/${is_admin ? 'admin' : 'user'}${path}`)
    } else {
      this.$router.push('/login')
    }
  },
}
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <div class="welcome-banner">
        <p>亲爱的{{ store.username || '游客' }}</p>
        <p>欢迎使用民航订票系统！</p>
        <el-button v-if="store.token" class="small" type="danger" @click="signout">退出登录</el-button>
      </div>
      <el-menu :default-active="currentIndex" class="el-menu-vertical-demo">
        <el-menu-item index="flight" @click="() => changeRouter('flight')">
          <el-icon>
            <Location />
          </el-icon>
          <span>航班信息</span>
        </el-menu-item>
        <el-menu-item index="order" @click="() => changeRouter('order')">
          <el-icon>
            <Ticket />
          </el-icon>
          <span>订单信息</span>
        </el-menu-item>
        <el-menu-item index="profile" @click="() => changeRouter('profile')">
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

<style lang="stylus" scoped>
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
  min-height: 100vh;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.welcome-banner {
  margin-bottom 50px
}
</style>
