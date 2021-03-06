**题目4：民航订票系统的开发**

课题内容：开发一个民航订票系统，进行系统需求分析、数据库设计和功能设计，选择合适的平台和工具，基于C/S或B/S结构进行系统实现，并对开发的系统进行测试。

课题要求：要求所开发的系统具有管理员和用户两类用户。各类用户都要进行登录认证。管理员负责录入航班信息，管理订票信息，余票数随订票的进行而自动减少；客户可以查询航班和机票信息，录入个人信息并完成订票。数据库设计要充分考虑完整性约束；用户界面要简捷友好。

需求：

| 权限 | 管理员 | 用户 |
| --- | --- | --- |
| 身份认证 |  | 录入用户信息 |
| 航班信息（余票统计） | 管理 | 查看 |
| 机票信息 | 管理 | 查看、下订单 |


## How to develop locally?

1. 安装依赖：`npm run install`
2. 启动本地前端项目：`cd flight-frontend && npm run dev:fe`
3. 启动本地Mysql：`cd flight-service && npm run init:db`
3. 启动本地后端项目：`npm run dev:be`

接口文档：http://localhost:8000/swagger


远端运行：`pm2 start npm -- run server`
