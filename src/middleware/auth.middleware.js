const jwt = require('jsonwebtoken');

// console.log('JWT_SECRET',JWT_SECRET);
// console.log('process.env',process.env);


const {
    tokenExpiredError,
    invalidToken,
    hasNotAdminPermission
} = require('../constants/err.type');

const { JWT_SECRET } = require('../config/config.default');

// 判断是否有 token(认证)
const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header;
    const token = authorization.replace('Bearer ', '');
    // console.log(token);

    try {
        // user 包含了 payload 的信息（id，user_name，is_admin）
        const user = jwt.verify(token, JWT_SECRET);
        // 把user数据挂载到 ctx.state 属性上面
        ctx.state.user = user;
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token 已过期', error);
                return ctx.app.emit('error', tokenExpiredError, ctx);

            case 'JsonWebTokenError':
                console.error('无效token', error);
                return ctx.app.emit('error', invalidToken, ctx);

            default:
                break;
        }
    }

    await next();
}

// 判断是否是管理员（授权）
const hadAdminPermission = async (ctx, next) => {
    const { is_admin } = ctx.state.user;
    // console.log('is_admin',is_admin);
    if (!is_admin) {
        console.error('该用户没有管理员的权限', ctx.state.user);
        return ctx.app.emit('error', hasNotAdminPermission, ctx);
    }

    await next();
}

module.exports = {
    auth,
    hadAdminPermission
}