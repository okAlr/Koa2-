const { createOrder, findAllOrder, updateOrder } = require('../service/order.service');

class OrderController {
    async create(ctx) {
        // 准备数据
        const user_id = ctx.state.user.id;
        const { address_id, goods_info, total } = ctx.request.body;

        // 订单号
        const order_number = 'XZD' + Date.now();
        const result = await createOrder({
            user_id,
            address_id,
            goods_info,
            total,
            order_number
        })
        ctx.body = {
            code: 0,
            message: '生成订单成功',
            result
        }
    }


    async findAll(ctx) {
        const user_id = ctx.state.user.id;
        // 这个是get请求的 query 参数
        const { pageNum = 1, pageSize = 2, status = 0 } = ctx.request.query;
        const res = await findAllOrder(user_id, pageNum, pageSize, status);
        ctx.body = {
            code: 0,
            message: '获取订单列表成功',
            result: res
        }
    }


    async update(ctx) {
        const user_id = ctx.state.user.id;
        const id = ctx.request.params.id;
        const { status } = ctx.request.body;

        const res = await updateOrder(user_id, id, status);

        ctx.body = {
            code: 0,
            message: '更新订单状态成功',
            result: res
        }
    }

}

module.exports = new OrderController();