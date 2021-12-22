/**,
 * @openapi
 * /admin/login:
 *    post:
 *      tags:
 *      - 管理员
 *      summary: 管理员登录
 *      consumes:
 *      - application/json
 *      requestBody:
 *        content:
 *          application/json:
  *           schema: 
  *             type: object
  *             required:
  *               - username
  *               - passwd
  *             properties:
  *               username:
  *                 type: string
  *               passwd:
  *                 type: string
 *      responses:
 *        200:
 *          description: 登录成功
 * */
import Router from "koa-router"
import AdminController from "../controller/admin"

const router = new Router()

router.post("/admin/login", AdminController.login)

export default router