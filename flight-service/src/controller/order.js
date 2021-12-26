class OrderController {
  constructor() {}
  // 获取我的订单记录
  async getMine(ctx, next) {
    next();
  }
  // ------------   管理员   ------------
  // 获取全部记录
  async getAll(ctx, next) {
    next();
  }
}

export default new OrderController();
