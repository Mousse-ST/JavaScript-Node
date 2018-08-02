const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`User Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:引入koa-router这个middleware，让它负责处理URL映射。
app.use(bodyParser());

// add controllers:由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
console.log('---------------------------');
