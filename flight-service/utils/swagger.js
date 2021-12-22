import path from 'path';
const router = require('koa-router')()
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight-service API',
      version: '1.0.0',
      description: '民航订票系统后台接口api',
    },
  },
  apis: [path.join(__dirname,'../src/routes/*.js')]
};
const swaggerSpec = swaggerJSDoc(options)

router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})

module.exports = router