// 这个主要是放和业务相关的
// 引入 node 内置模块放最上面
// 中间是 引入第三方模块
// 自己写的模块就放在第三部分

const path = require('path');

const Koa = require('koa');
const { koaBody } = require('koa-body');
// 这个是生成静态资源服务器
const KoaStatic = require('koa-static');
// 这个是校验传过来的参数是否是对的
const parameter = require('koa-parameter');

const errHandlers = require('./errHandler');

const router = require('../router/index');

const app = new Koa();

// 当前进程运行的位置
// console.log(process.cwd());

// 这个需要在所有路由之前注册中间件
// 这些选项是用来设置 上传文件（图片）的要求
app.use(koaBody({
    multipart: true,
    formidable: {
        // 在配置选项option中，不推荐使用相对路径
        // 在 option 里面的相对路径，不是相对的当前路径，相对 process.cwd() ，就是当前执行的进程所在的文件
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
    },
    // 默认只会在这'POST', 'PUT', 'PATCH'三种方法中将 request.body 下面的内容挂载到 ctx 下面
    // 若要让他支持其他方法的话，需要手动配置一个  parsedMethods 参数选项
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}));

// 有了下面这一步（注册之后），就会在 ctx 上面挂载一个方法 verifyParams
// 这样每个中间件都可以调用这个方法进行参数校验
app.use(parameter(app));

// use(router.allowedMethods())
app.use(router.routes());

// KoaStatic 的作用就是：将某一个文件夹下面的资源作为静态资源
app.use(KoaStatic(path.join(__dirname, '../upload')));

// 统一的错误处理
app.on('error', errHandlers);


module.exports = app;