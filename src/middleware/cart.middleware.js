
const { cartFormatError } = require('../constants/err.type');

// 注意：当某一个中间件函数的功能是：验证字段是否合法的时候，在 middleware 里面
// 可以调用 service 函数的

// 这里是闭包，做了一个复用
const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules);
        } catch (error) {
            console.error(error);
            cartFormatError.result = error;
            return ctx.app.emit('error', cartFormatError, ctx);
        }

        await next();
    }
}


module.exports = {
    validator
}