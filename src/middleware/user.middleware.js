// 错误处理：合法性和合理性

const { getUserInfo } = require('../service/user.service');
const { userFormateError, userAlreadyExisted, userRegisterError } = require('../constants/err.type');

const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;

    // 合法性
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body);
        // 发布订阅模式
        ctx.app.emit('error', userFormateError, ctx);
        return;
    }

    await next();
}

const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body;

    // 实现 调用 service 层函数的时候，都使用 try catch 
    // 合理性
    try {
        const res = await getUserInfo({ user_name });
        if (res) {
            console.error('用户名已经存在', { user_name });
            ctx.app.emit('error', userAlreadyExisted, ctx);
            return;
        }
    } catch (error) {
        console.error('获取用户信息错误', error);
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }

    await next();
}



module.exports = {
    userValidator,
    verifyUser
}