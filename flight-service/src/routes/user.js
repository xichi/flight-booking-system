/**,
 * @openapi
 * /user/login:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 用户登录
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
 * /user/signout:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 用户退出登录
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
 * /user/getAllUser:
 *    get:
 *      tags:
 *      - 用户
 *      summary: 获取全部用户信息
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
 * /user/register:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 注册新用户
 *      consumes:
 *      - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *           schema: 
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - passwd
 *               - repeatedPasswd
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               passwd:
 *                 type: string
 *               repeatedPasswd:
 *                 type: string
 *      responses:
 *        200:
 *          description: success = true 注册成功
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true 注册获取
 *                  token:
 *                    type: string
 *                    description: token
 *                  message:
 *                    type: string
 *                    description: 错误提示
 * /user/updateInfo:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 更新用户信息
 *      consumes:
 *      - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *           schema: 
 *             type: object
 *             required:
 *               - certification_type
 *               - certification_number
 *               - telephone
 *               - sex
 *               - age
 *               - balance
 *               - address
 *             properties:
 *               certification_type:
 *                 type: integer
 *               certification_number:
 *                 type: string
 *               telephone:
 *                 type: integer
 *               sex:
 *                 type: integer
 *               age:
 *                 type: integer
 *               balance:
 *                 type: integer
 *               address:
 *                 type: string
 *      responses:
 *        200:
 *          description: success = true 更新成功
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: true 注册获取
 *                  message:
 *                    type: string
 *                    description: 错误提示
 * */
import Router from "koa-router"
import UserController from "../controller/user"

const router = new Router()

router.post("/user/login", UserController.login)
router.post("/user/register", UserController.register)
router.post("/user/signout", UserController.signout)
router.get("/user/getAllUser", UserController.getAllUser)
router.get("/user/getUserInfo", UserController.getUserInfo)
router.post("/user/updateInfo", UserController.updateInfo)
router.get("/user/checkAuth", UserController.checkAuth)

export default router