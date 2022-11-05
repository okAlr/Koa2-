// 这个主要是放和业务相关的
const Koa = require('koa');
const {koaBody} = require('koa-body');
const userRouter = require('../router/user.route')
const app = new Koa();


// 这个需要在所有路由之前注册中间件
app.use(koaBody());

app.use(userRouter.routes());

module.exports = app;