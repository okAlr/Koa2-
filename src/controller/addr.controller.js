const {createAttr} = require('../service/addr.service');
class AddrController {
    async create(ctx) {
        const { consignee, phone, address } = ctx.request.body;
        const user_id = ctx.state.user.id;

        const res = await createAttr({ user_id, consignee, phone, address });

        ctx.body = {
            code: 0,
            message: '添加地址成功',
            result: res
        }
    }
}

module.exports = new AddrController();