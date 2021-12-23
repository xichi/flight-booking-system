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
 *          description: success = 1 登录成功
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true 登录成功，false 登录失败
 *                  token:
 *                    type: string
 *                    description: 登录成功的token
 *                  type:
 *                    type: string
 *                    description: 错误类型
 *                  message:
 *                    type: string
 *                    description: 错误提示
 * /admin/signout:
 *    post:
 *      tags:
 *      - 管理员
 *      summary: 管理员退出登录
 *      consumes:
 *      - application/json
 *      responses:
 *        200:
 *          description: success = true 退出成功
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true 退出成功，false 退出失败
 *                  message:
 *                    type: string
 *                    description: 错误提示
 * /admin/getAllAdmin:
 *    get:
 *      tags:
 *      - 管理员
 *      summary: 获取全部管理员信息
 *      consumes:
 *      - application/json
 *      responses:
 *        200:
 *          description: success = true 退出成功
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true 成功获取
 *                  data:
 *                    type: array
 *                    description: 管理员列表
 *                  message:
 *                    type: string
 *                    description: 错误提示
 * */
import Router from "koa-router"
import AdminController from "../controller/admin"

const router = new Router()

router.post("/admin/login", AdminController.login)
router.post("/admin/signout", AdminController.signout)
router.get("/admin/getAllAdmin", AdminController.getAllAdmin)

export default router