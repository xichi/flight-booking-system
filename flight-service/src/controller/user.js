import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../constant';
import UserModel from '../models/user';
import { checkAdminAuth } from '../middlewares/check';

class UserController {
  constructor() { }
  // 登录
  async login(ctx, next) {
    const param = ctx.request.body;
    const { username, passwd } = param;
    try {
      const user = await UserModel.findOne({ where: { user_name: username } });
      if (!user) {
        ctx.body = {
          success: false,
          type: 'UNKOWN_USERNAME',
          message: '用户名不存在'
        }
      }
      else if (passwd !== user.user_passwd) {
        ctx.body = {
          success: false,
          type: 'ERROR_PASSWORD',
          message: '密码输入错误'
        }
      }
      else {
        const token = jwt.sign({ is_admin: false, id: user.user_id, name: user.user_name }, jwtSecret, { expiresIn: '30d' });
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
    next();
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
    next();
  }
  // 注册
  async register(ctx, next) {
    const param = ctx.request.body;
    const { username, email, passwd, repeatedPasswd } = param;
    try {
      if (passwd !== repeatedPasswd) {
        ctx.body = {
          success: false,
          type: 'ERROR_PASSWORD',
          message: '两次密码输入不一致'
        }
      }
      const emailExist = await UserModel.findOne({ where: { user_email: email } });
      if (emailExist) {
        ctx.body = {
          success: false,
          type: 'USER_HAS_EXIST',
          message: '该邮箱已经注册'
        }
        return;
      }
      const nameExist = await UserModel.findOne({ where: { user_name: username } });
      if (nameExist) {
        ctx.body = {
          success: false,
          type: 'USER_HAS_EXIST',
          message: '该用户名已经注册'
        }
        return;
      }
      const user = await UserModel.create({ user_name: username, user_email: email, user_passwd: passwd });
      const token = jwt.sign({ is_admin: false, id: user.user_id, name: user.user_name }, jwtSecret, { expiresIn: '30d' });
      ctx.body = {
        success: true,
        token,
      }
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      ctx.body = {
        success: false,
        type: 'REGISTER_FAILLED',
        message: '注册失败'
      }
    }
    next();
  }
  // 更新用户信息
  async updateInfo(ctx, next) {
    const param = ctx.request.body;
    const {
      certification_type,
      certification_number,
      telephone,
      sex,
      age,
      balance,
      address
    } = param;
    const token = ctx.request.header.authorization.slice(7);
    const { id } = jwt.verify(token, jwtSecret);
    try {
      const user = await UserModel.update({
        certification_type,
        certification_number,
        telephone,
        sex,
        age,
        balance,
        address
      }, { where: { user_id: id } });
      const userInfo = await UserModel.findOne({ where: { user_id: id } })
      ctx.body = {
        success: true,
        data: userInfo
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: '更新用户信息失败'
      };
    }
    next();
  }
  // 获取用户信息
  async getUserInfo(ctx, next) {
    try {
      const token = ctx.request.header.authorization.slice(7);
      const { id } = jwt.verify(token, jwtSecret);
      const user = await UserModel.findOne({ where: { user_id: id }});
      ctx.body = {
        success: true,
        data: user
      };
    } catch (err) {
      ctx.body = {
        success: false,
        message: '查询失败'
      };
    }
    next();
  }
  // 获取用户列表
  async getAllUser(ctx, next) {
    const token = ctx.request.header.authorization.slice(7);
    if (!checkAdminAuth(token)) {
      ctx.status = 403;
      ctx.body = {
        success: false,
        message: '没有管理员权限'
      };
    } else {
      try {
        const user = await UserModel.findAll();
        ctx.body = {
          success: true,
          data: user
        };
      } catch (err) {
        ctx.body = {
          success: false,
          message: '查询失败'
        };
      }
    }
    next();
  }
    // 获取用户权限
    async checkAuth(ctx, next) {
      const token = ctx.request.header.authorization.slice(7);
      try {
        ctx.body = {
          success: true,
          is_admin: checkAdminAuth(token) // 是否为管理员
        };
      } catch (err) {
        ctx.body = {
          success: false,
          message: '获取用户权限失败'
        };
      }
      next();
    }
}

export default new UserController();