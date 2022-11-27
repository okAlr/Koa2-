// 1.导入 sequlize 的连接
const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

// cart 表需要和 goods 表关联，并且需要做连表查询
const Goods = require('./goods.model');



// 2. 定义 Cart 模型
const Cart = seq.define('zd_carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户的id'
    },

    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "商品的数量"
    },

    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中'
    }
})

// 3.同步数据（建表）
// Cart.sync({ force: true });



// 联表查询
// 为什么是使用 BelongTo 方法？是因为 在Cart表中，有外键 goods_id (外键在当前表里面，就使用 BelongTo)
// 另一种写法就是 Goods.hasOne(Cart)
Cart.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: "goods_info" // as 表示在接口中展示的连表查询的别名
});

module.exports = Cart;

