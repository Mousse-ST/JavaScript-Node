const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const main = async (ctx, next) => {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name };
};

app.use(koaBody());
app.use(main);
app.listen(3000);


// 打开另一个命令行窗口，运行下面的命令。使用 POST 方法向服务器发送一个键值对，会被正确解析。如果发送的数据不正确，就会收到错误提示。

//     curl -X POST --data "name=Jack" 127.0.0.1:3000
//     {"name":"Jack"}

//     curl -X POST --data "name" 127.0.0.1:3000
//     name required
