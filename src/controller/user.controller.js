// constroller 这一层主要是处理 route 中的 handle_route 
const {
    createUser,
    getUserInfo,
    updateById
} = require('../service/user.service');
const { userRegisterError } = require('../constants/err.type');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');

class UserController {

    // 注册
    async register(ctx, next) {
        // 1.获取数据
        const { user_name, password } = ctx.request.body;

        try {
            // 2.操作数据库
            const res = await createUser(user_name, password);

            // 3.返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (error) {
            console.log(error);
            ctx.app.emit('error', userRegisterError, ctx);
        }
    }

    // 登陆
    async login(ctx, next) {
        const { user_name } = ctx.request.body;
        // 1.获取用户信息（token的 payload中，记录 id,user_name,is_admin
        try {
            // 从返回结果对象中剔除 password 属性，将剩下的属性放到 res 对象
            const { password, ...res } = await getUserInfo({ user_name });

            ctx.body = {
                code: 0,
                message: '用户登陆成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }

        } catch (error) {
            console.log(error);
            ctx.app.emit('error', userLoginError, ctx);
        }

    }


    // 修改密码
    async changePassword(ctx, next) {
        // 1.获取数据
        const id = ctx.state.user.id;
        const password = ctx.request.body.password;
        console.log(id, password);

        // 2. 操作数据库
        if (await updateById({ id, password })) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: ''
            }
        }

        // 3. 返回结果


    }
}

module.exports = new UserController();