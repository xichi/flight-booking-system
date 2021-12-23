import path from 'path';
import router from 'koa-router';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight-Service API',
      version: '1.0.0',
      description: '民航订票系统后台接口api',
    },
  },
  apis: [path.join(__dirname, '../src/routes/*.js')]
};
const swaggerSpec = swaggerJSDoc(options)

const swaggerRouter = router();
swaggerRouter.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})

export default swaggerRouter;