const { createUser } = require('../service/user.service');


class UserController {
    async register(ctx, next) {
        // 1.获取数据
        const { user_name, password } = ctx.request.body;
        // 2.操作数据库
        const res = await createUser(user_name, password);
        console.log(res);
        // 3.返回结果
        ctx.body = ctx.request.body;
    }

    async login(ctx, next) {
        ctx.body = '用户登陆成功';
    }
}

module.exports = new UserController();