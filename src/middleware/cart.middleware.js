
const { invalidGoodsId } = require('../constants/err.type');

// 注意：当某一个中间件函数的功能是：验证字段是否合法的时候，在 middleware 里面
// 可以调用 service 函数的

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_id: 'number'
        })
    } catch (error) {
        console.error(error);
        invalidGoodsId.result = error;
        return ctx.app.emit('error', invalidGoodsId, ctx);
    }

    await next();
}


module.exports = {
    validator
}