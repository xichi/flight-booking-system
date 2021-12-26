import "date-utils";
import Sequelize from "sequelize";
import FlightModel from "../models/flight";
import OrderModel from "../models/order";
import UserModel from "../models/user";
import { checkAdminAuth } from "../middlewares/check";

const Op = Sequelize.Op;
class FlightController {
  constructor() {}
  // 获取查询记录
  async getOnes(ctx, next) {
    try {
      const { from_city, to_city, departure_date } = ctx.request.query;
      const date = new Date(departure_date);
      const date2 = new Date(departure_date).add({ days: 1 });
      const { count, rows: result } = await FlightModel.findAndCountAll({
        where: {
          from_city,
          to_city,
          [Op.and]: [
            {
              departure_time: {
                [Op.between]: [date, date2],
              },
            },
          ],
        },
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
        message: "查询记录失败",
      };
    }
    next();
  }
  // 购票
  async buyTicket(ctx, next) {
    try {
      const { flight_id, user_id, order_price } = ctx.request.body;
      const { remain_seats } = await FlightModel.findOne({
        where: { flight_id },
      });
      if(remain_seats <= 0) {
        ctx.body = {
          success: false,
          message: "机票已卖完",
        };
        return;
      }
      const user = await UserModel.findOne({ where: { user_id }});
      const isNotComplete = Object.entries(user.dataValues).some(item => item[1] === null);
      if(isNotComplete) {
        ctx.body = {
          success: false,
          message: "请先去用户中心完善信息再订票~",
        };
        return;
      }
      const order = await OrderModel.create({
        user_id,
        flight_id,
        order_time: new Date(),
        order_price,
        check_status: 0,
      });
      const new_remain_seats = remain_seats - 1;
      await FlightModel.update(
        { remain_seats: new_remain_seats },
        { where: { flight_id } }
      );
      ctx.body = {
        success: true,
        data: {
          flight_id,
          remain_seats: new_remain_seats,
          order
        },
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        success: false,
        message: "购票失败",
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
        const flight = await FlightModel.findAll({ where: { flight_id } });
        ctx.body = {
          success: true,
          data: flight,
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
  // 更新记录
  async updateOne(ctx, next) {
    try {
      if (!checkAdminAuth(ctx)) {
        ctx.status = 403;
        ctx.body = {
          success: false,
          message: "没有管理员权限",
        };
      } else {
        const record = ctx.request.body;
        const { flight_id } = record;
        if (flight_id === undefined) {
          ctx.body = {
            success: false,
            message: "参数flight_id不能为空",
          };
          return;
        }
        await FlightModel.update(record, {
          where: { flight_id },
        });
        const flightData = await FlightModel.findOne({ where: { flight_id } });
        ctx.body = {
          success: true,
          data: flightData,
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        success: false,
        message: "更新记录失败，请检查参数是否正确",
      };
    }
    next();
  }
  // 新增记录
  async addOne(ctx, next) {
    try {
      if (!checkAdminAuth(ctx)) {
        ctx.status = 403;
        ctx.body = {
          success: false,
          message: "没有管理员权限",
        };
      } else {
        const record = ctx.request.body;
        const flight = await FlightModel.create(record);
        ctx.body = {
          success: true,
          data: flight,
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        success: false,
        message: "新增记录失败，请检查参数是否正确",
      };
    }
    next();
  }
}

export default new FlightController();
