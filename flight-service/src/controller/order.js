import OrderModel from "../models/order";
import FlightModel from "../models/flight";
import UserModel from "../models/user";
import { checkAdminAuth, verifyToken } from "../middlewares/check";
class OrderController {
  constructor() {}
  // 获取我的订单记录
  async getMine(ctx, next) {
    try {
      const { id: user_id, is_admin } = verifyToken(ctx);
      if (is_admin) {
        ctx.body = {
          success: false,
          message: "请以用户身份登录查询",
        };
        return;
      }
      const { count, rows: result } = await OrderModel.findAndCountAll({
        where: { user_id },
        include: [
          {
            model: FlightModel,
          },
          {
            model: UserModel,
          },
        ],
      });
      ctx.body = {
        success: true,
        data: {
          count,
          result,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        success: false,
        message: "获取记录失败",
      };
    }
    next();
  }
  // ------------   管理员   ------------
  // 获取全部记录
  async getAll(ctx, next) {
    try {
      if (!checkAdminAuth(ctx)) {
        ctx.status = 403;
        ctx.body = {
          success: false,
          message: "没有管理员权限",
        };
      } else {
        const order = await OrderModel.findAll({
          include: [
            {
              model: FlightModel,
            },
            {
              model: UserModel,
            },
          ],
        });
        ctx.body = {
          success: true,
          data: order,
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        success: false,
        message: "获取记录失败",
      };
    }
    next();
  }
}

export default new OrderController();
