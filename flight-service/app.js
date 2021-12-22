import Koa from "koa";
import compose from "koa-compose";
import koaBody from "koa-body";
import { koaSwagger } from 'koa2-swagger-ui';
import sequelize from './src/db/index';
import router from './src/routes/index.js';
import swagger from './utils/swagger';

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
  router(),
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
])
app.use(middleware)
app.use(swagger.routes(), swagger.allowedMethods())

const port = 8000;
app.listen(port, () => {
  console.log(`app runnig at ${port}`)
});