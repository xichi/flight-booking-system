/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *      - test
 *     description: test
 *     responses:
 *       200:
 *         description: hello world!
 * 
 */
import Router from "koa-router"
import combineRoutes from "koa-combine-routers"
import admin from "./admin"
import user from "./user"

const router = new Router()
const index = router.get("/", ctx => {
  ctx.body = "hello world!"
})

export default combineRoutes(
  index,
  admin,
  user
)