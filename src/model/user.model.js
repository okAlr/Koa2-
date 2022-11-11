const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

// 创建模型,Model 中的 zd_user 对应的就是数据库中 zd_users 表
// 注意;在这里声明的每一个字段和数据表里面的字段都是一一对应的
const User = seq.define('zd_user', {
    // id 会被 sequelize 自动创建，管理
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员,0 代表不是管理员'
    }
});

// 强制同步数据库
// 这一句话的作用：在数据库生成 zd_users 表
// User.sync({ force: true });

module.exports = User;