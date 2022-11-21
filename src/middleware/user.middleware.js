const bcrypt = require('bcryptjs');
const { getUserInfo } = require('../service/user.service');
const {
    userFormateError,
    userAlreadyExisted,
    userRegisterError,
    userNotExist,
    userLoginError,
    invalidPassword
} = require('../constants/err.type');


// 错误处理：合法性和合理性
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


// 密码加密
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    // 同步方式
    const salt = bcrypt.genSaltSync(10);
    // hash 保存的是密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;

    await next();
}


const verifyLogin = async (ctx, next) => {
    try {
        // 判断用户是否存在
        const { user_name, password } = ctx.request.body;
        const res = await getUserInfo({ user_name });
        if (!res) {
            console.error('用户名不存在', { user_name });
            ctx.app.emit('error', userNotExist, ctx);
            return;
        }

        // 判断密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx);
            return;
        }

    } catch (error) {
        console.error(error);
        return ctx.app.emit('error', userLoginError, ctx);
    }

    await next();



}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
}