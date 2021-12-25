import { createRouter, createWebHashHistory } from "vue-router"
import Index from "@/pages/Index.vue"
import Login from "@/pages/common/Login.vue"
import AdminProfile from "@/pages/admin/Profile.vue"
import UserProfile from "@/pages/user/Profile.vue"
import AdminFlight from "@/pages/admin/Flight.vue"
import UserFlight from "@/pages/user/Flight.vue"
import AdminOrder from "@/pages/admin/Order.vue"
import UserOrder from "@/pages/user/Order.vue"

const routes = [
  {
    path: "/", component: Index, children: [
      {
        path: "/login", component: Login
      },
      {
        path: "/admin/profile", component: AdminProfile
      },
      {
        path: "/user/profile", component: UserProfile
      }, 
      {
        path: "/admin/flight", component: AdminFlight
      },
      {
        path: "/user/flight", component: UserFlight
      },
      {
        path: "/admin/order", component: AdminOrder
      },
      {
        path: "/user/order", component: UserOrder
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router