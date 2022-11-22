const { DataTypes } = require('sequelize');

// 数据库的连接
const seq = require('../db/seq');

const Goods = seq.define('zd_goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品价格'
    },

    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格'
    },

    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品库存'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片的 url'
    }

}, {
    paranoid: true // 这个配置项的作用：加上一个 deleteAt 的字段
})

// 创建表
// Goods.sync({ force: true });

module.exports = Goods;