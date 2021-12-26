import Router from "koa-router"
import FlightController from "../controller/flight"

const router = new Router()

router.get("/flight/getOnes", FlightController.getOnes)
router.post("/flight/buyTicket", FlightController.buyTicket)
// ------------   管理员   ------------
router.get("/flight/getAll", FlightController.getAll)
router.post("/flight/updateOne", FlightController.updateOne)
router.post("/flight/addOne", FlightController.addOne)

export default router