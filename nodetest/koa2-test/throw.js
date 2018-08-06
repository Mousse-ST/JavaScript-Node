const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html';
        ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
        ctx.app.emit('error', err, ctx);//如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效。
    }
};

const main = ctx => {
    ctx.throw(500);
};

//为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。
app.use(handler);

//监听这个事件，也可以处理错误。
app.on('error', (err, ctx) => {
    console.error('server error', err);
});

app.use(main);
app.listen(3000);
