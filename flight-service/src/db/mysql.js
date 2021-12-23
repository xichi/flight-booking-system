import Sequelize from 'Sequelize';
const sequelize = new Sequelize('flight', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        freezeTableName: true, // 禁用表名自动复数
        timestamps: false      // 禁用每个模型自动添加 createdAt 和 updatedAt 字段
    }
});
export default sequelize;