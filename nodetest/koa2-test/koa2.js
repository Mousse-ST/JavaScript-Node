const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => { // 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
    console.log('第一1');
    await next(); // 调用下一个middleware，koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
    console.log('第一2');
});

app.use(async (ctx, next) => {
    console.log('第二1');
    await next(); // 调用下一个middleware
    console.log('第二2');
});

app.use(async (ctx, next) => {
    console.log('第三1');
    await next();
    console.log('第三2');
});
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);
console.log('app started at port 3000...');
