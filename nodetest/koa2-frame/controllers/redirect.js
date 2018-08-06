const fn_redirect = async (ctx, next) => {
    ctx.response.redirect('/');//可以发出一个302跳转，将用户导向另一个路由，此处直接导向根目录
    ctx.response.body = '<a href="/">Index Page</a>';
};

module.exports = {
    'GET /redirect': fn_redirect
}
