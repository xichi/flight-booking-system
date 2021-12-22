import AdminModel from '../models/admin';

class AdminController {
  constructor() { }
  async login(ctx, next) {
    const param = ctx.request.body;
    const { username, passwd } = param;
    // 身份验证
    try {
      const admin = await AdminModel.findOne({ where: { admin_name: username } });
      console.log(admin)
      if (!admin) {
        ctx.body = {
          status: 0,
          type: 'ERROR_USERNAME',
          message: '用户名错误'
        }
      }
      else if (passwd !== admin.admin_passwd) {
        ctx.body = {
          status: 0,
          type: 'ERROR_PASSWORD',
          message: '该用户已存在，密码输入错误'
        }
      }
      else {
        ctx.set('set-cookie', `admin_id=${admin.admin_id}`);
        ctx.body = {
          status: 1,
          success: '登录成功'
        }
      }
    } catch (err) {
      ctx.body = {
        status: 0,
        type: 'LOGIN_FAILLED',
        message: '登录失败'
      }
    }
    next()
  }
}

export default new AdminController();