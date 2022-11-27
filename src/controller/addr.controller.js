const { createAttr, findAllAddr } = require('../service/addr.service');
class AddrController {
    async create(ctx) {
        const { consignee, phone, address } = ctx.request.body;
        let user_id = ctx.state.user.id;

        const res = await createAttr({ user_id, consignee, phone, address });

        ctx.body = {
            code: 0,
            message: '添加地址成功',
            result: res
        }
    }

    async findAll(ctx) {
        const user_id = ctx.state.user.id;
        const res = await findAllAddr(user_id);
        ctx.body = {
            code: 0,
            message: '获取列表成功',
            result: res
        }
    }
}

module.exports = new AddrController();