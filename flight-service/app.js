const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const port = 8000;
app.listen(port, ()=>{
  console.log(`app runnig at ${port}`)
});