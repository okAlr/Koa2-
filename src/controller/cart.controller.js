const { createOrUpdate,findCarts } = require('../service/cart.service');

class CartController {
    // 添加购物车
    async add(ctx) {
        // 解析 user_id，goods_id
        // ctx.state.user 这个user 是在 auth 中间件中挂载上去的
        const user_id = ctx.state.user.id;
        const goods_id = ctx.request.body.goods_id;

        // 操作数据库
        const res = await createOrUpdate(user_id, goods_id);
        // console.log('res:', res.dataValues);

        // 返回结果
        ctx.body = {
            code: 0,
            message: '添加购物车成功',
            result: res
        }
        // try {
        //     // 解析 user_id，goods_id
        //     // ctx.state.user 这个user 是在 auth 中间件中挂载上去的
        //     const user_id = ctx.state.user.id;
        //     const goods_id = ctx.request.body.goods_id;

        //     // 操作数据库
        //     const res = await createOrUpdate(user_id, goods_id);
        //     console.log('res:', res.dataValues);

        //     // 返回结果
        //     ctx.body = {
        //         code: 0,
        //         message: '添加购物车成功',
        //         result: res.dataValues
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }

    // 查询商品列表
    async findAll(ctx) {
        // 解析请求参数
        const { pageNum = 1, pageSize = 10 } = ctx.request.query;
        // 操作数据库
        const res = await findCarts(pageNum, pageSize);

        // 返回结果
        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res
        }

        // 返回结果
    }
}

module.exports = new CartController();