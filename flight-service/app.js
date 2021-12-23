import Koa from "koa";
import compose from "koa-compose";
import koaBody from "koa-body";
import { koaSwagger } from 'koa2-swagger-ui';
import koaJwt from 'koa-jwt';
import router from './src/routes/index.js';
import swagger from './utils/swagger';
import { jwtSecret } from './constant';

const app = new Koa();

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

// koa-jwt
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});
app.use(koaJwt({
  secret: jwtSecret
}).unless({
  path: [/\w*\/login$/, /\w*\/register$/, /^\/swagger/]
}));

const port = 8000;
app.listen(port, () => {
  console.log(`app runnig at ${port}`)
});