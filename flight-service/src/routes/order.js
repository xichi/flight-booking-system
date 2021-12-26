import Router from "koa-router"
import OrderController from "../controller/order"

const router = new Router()

router.get("/order/getMine", OrderController.getMine)
// ------------   管理员   ------------
router.get("/order/getAll", OrderController.getAll)

export default router