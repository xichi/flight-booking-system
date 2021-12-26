import "date-utils";

class FlightController {
  constructor() {}
  // 获取查询记录
  async getOnes(ctx, next) {
    next();
  }
  // 购票
  async buyTicket(ctx, next) {
    next();
  }
  // ------------   管理员   ------------
  // 获取全部记录
  async getAll(ctx, next) {
    next();
  }
  // 更新记录
  async updateOne(ctx, next) {
    next();
  }
  // 新增记录
  async addOne(ctx, next) {
    next();
  }
}

export default new FlightController();
