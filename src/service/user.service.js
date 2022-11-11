// service 层是操作数据库的，是通过操作 model 来操作数据库的
const User = require('../model/user.model');

class UserService {
    // 创建用户
    async createUser(user_name, password) {
        // 数据库操作,插入数据
        const res = await User.create({ user_name, password });
        console.log("res:", res);
        return res.dataValues;
    }

    // 查询是否存在用户
    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {};

        id && Object.assign(whereOpt, { id });
        user_name && Object.assign(whereOpt, { user_name });
        password && Object.assign(whereOpt, { password });
        is_admin && Object.assign(whereOpt, { is_admin });

        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })

        return res ? res.dataValues : null;
    }

}

module.exports = new UserService();