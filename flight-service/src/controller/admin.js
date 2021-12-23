import 'date-utils';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../constant';
import AdminModel from '../models/admin';

class AdminController {
  constructor() { }
  // 登录
  async login(ctx, next) {
    const param = ctx.request.body;
    const { username, passwd } = param;
    // 身份验证
    try {
      const admin = await AdminModel.findOne({ where: { admin_name: username } });
      if (!admin) {
        ctx.body = {
          success: false,
          type: 'UNKOWN_USERNAME',
          message: '用户名不存在'
        }
      }
      else if (passwd !== admin.admin_passwd) {
        ctx.body = {
          success: false,
          type: 'ERROR_PASSWORD',
          message: '密码输入错误'
        }
      }
      else {
        const token = jwt.sign({ is_admin: true, id: admin.admin_id, name: admin.admin_name }, jwtSecret, { expiresIn: '30d' });
        ctx.body = {
          success: true,
          message: '登录成功',
          token,
        }
      }
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      ctx.body = {
        success: false,
        type: 'LOGIN_FAILLED',
        message: '登录失败'
      }
    }
    next()
  }
  // 退出登录
  async signout(ctx, next) {
    try {
      ctx.body = {
        success: true,
        message: '退出成功'
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: '退出失败'
      };
    }
    next()
  }
  // 获取管理员列表
  async getAllAdmin(ctx, next) {
    try {
      const admin = await AdminModel.findAll();
      ctx.body = {
        success: true,
        data: admin
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: '查询失败'
      };
    }
    next();
  }
}

export default new AdminController();