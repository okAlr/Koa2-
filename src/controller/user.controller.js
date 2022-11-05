class UserController {
    async register(ctx, next) {
        ctx.body = '用户注册成功';
    }

    async login(ctx, next) {
        ctx.body = '用户登陆成功';
    }
}

module.exports = new UserController();