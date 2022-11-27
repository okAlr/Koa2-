const {
    createAttr,
    findAllAddr,
    updateAddr,
    removeAddr,
    setDefaultAddr } = require('../service/addr.service');
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

    async update(ctx) {
        // 这个是拿到的是地址的id，每个地址也有自己的id
        const id = ctx.request.params.id;
        const { consignee, phone, address } = ctx.request.body;
        const res = await updateAddr(id, { consignee, phone, address });
        ctx.body = {
            code: 0,
            message: '更新地址成功',
            result: res
        }

    }

    async remove(ctx) {
        const id = ctx.request.params.id;
        const res = await removeAddr(id);

        ctx.body = {
            code: 0,
            message: '删除地址成功',
            result: res
        }
    }

    async setDefault(ctx) {
        const id = ctx.request.params.id;
        // 这里不仅需要将该地址id设为 is_default 为true，
        // 并且还需要把其他地址id的 is_default 为 false 
        const user_id = ctx.state.user.id;
        const res = await setDefaultAddr(user_id, id);
        ctx.body = {
            code: 0,
            message: '设置默认成功',
            result: res
        }
    }
}

module.exports = new AddrController();