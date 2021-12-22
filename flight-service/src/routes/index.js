import Router from "koa-router"
import combineRoutes from "koa-combine-routers"
import admin from "./admin"

const router = new Router()
const index = router.get("/", ctx => {
  ctx.body = "hello world!"
})

export default combineRoutes(
  index,
  admin
)