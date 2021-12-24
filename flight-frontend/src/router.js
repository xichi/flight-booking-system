import { createRouter, createWebHashHistory } from "vue-router"
import Index from "@/pages/Index.vue"
import Login from "@/pages/common/Login.vue"
import AdminProfile from "@/pages/admin/Profile.vue"
import UserProfile from "@/pages/user/Profile.vue"

const routes = [
  {
    path: "/", component: Index, redirect: '/login', children: [
      {
        path: "/login", component: Login
      },
      {
        path: "/admin/profile", component: AdminProfile
      },
      {
        path: "/user/profile", component: UserProfile
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router