import Router from "koa-router"
import AdminController from "../controller/admin"

const router = new Router()

router.post("/admin/login", AdminController.login)

export default router