
const { cartFormatError } = require('../constants/err.type');
const {
    createOrUpdate,
    findCarts,
    updateCarts,
    removeCart,
    selectAllCarts,
    unSelectAllCarts
} = require('../service/cart.service');

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


    // 更新购物车
    async update(ctx) {
        // 1.解析参数
        const { id } = ctx.request.params;
        const { number, selected } = ctx.request.body;
        if (number === undefined && selected === undefined) {
            // 注意：这种友好提示的方法很值得学习
            cartFormatError.result = 'number和selected不能同时为空';
            return ctx.app.emit('error', cartFormatError, ctx);
        }
        // 2.操作数据库
        const res = await updateCarts({ id, number, selected });
        // 3.返回数据
        ctx.body = {
            code: 0,
            message: '更新购物车成功',
            result: res
        }

    }

    // 删除购物车
    async remove(ctx) {
        try {
            const { ids } = ctx.request.body;
            const res = await removeCart(ids);
            ctx.body = {
                code: 0,
                message: '删除数据库成功',
                result: res
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 全选
    async selectAll(ctx) {
        const user_id = ctx.state.user.id;
        const { checkAll } = ctx.request.body;
        const res = await selectAllCarts(user_id, checkAll);
        let message = '全部选中';
        if (!checkAll) {
            message = '全部不选中';
        }
        ctx.body = {
            code: 0,
            message,
            result: res
        }

    }

    // async unSelectAll(ctx) {
    //     const user_id = ctx.state.user.id;
    //     const res = await unSelectAllCarts(user_id);
    //     ctx.body = {
    //         code: 0,
    //         message: '全部不选中',
    //         result: res
    //     }
    // }
}

module.exports = new CartController();