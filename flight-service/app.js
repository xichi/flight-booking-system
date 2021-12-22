import Koa from "koa";
import compose from "koa-compose";
import koaBody from "koa-body";
import sequelize from './src/db/index';
import router from './src/routes/index.js';

const app = new Koa();

// test mysql connection
try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const middleware = compose([
  koaBody(),
])
app.use(middleware)
app.use(router());

const port = 8000;
app.listen(port, () => {
  console.log(`app runnig at ${port}`)
});