const { Op } = require('sequelize');
const Cart = require('../model/cart.model');
const Goods = require('../model/goods.model');

class CartService {
    // 添加商品的时候，判断是创建商品还是商品数目加一
    async createOrUpdate(user_id, goods_id) {
        try {
            // 根据 userId 和 goodsId 同时查找，有没有记录
            let res = await Cart.findOne({
                where: {
                    [Op.and]: {
                        user_id,
                        goods_id
                    }
                }
            })

            if (res) {
                // 已经存在一条记录
                await res.increment('number'); // 这句的意思是 number 字段加一，默认是加一，可看 seqlize 文档
                // console.log('+++',await res.reload().dataValues);
                return await res.reload();
            } else {
                // 没有记录
                return await Cart.create({
                    user_id,
                    goods_id
                })
            }
        } catch (error) {
            console.error(error);
        }
    }


    // 购物车查询：涉及到联表查询，需要多看看 seqlize 文档
    async findCarts(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'], // 这个是指定暴露给前端的属性
            offset: offset,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: "goods_info",
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
            }
        })

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }



    async updateCarts(params) {
        const { id, number, selected } = params;

        const res = await Cart.findByPk(id);

        if (res === undefined) {
            return '';
        }
        number !== undefined ? (res.number = number) : '';
        if (selected !== undefined) {
            res.selected = selected;
        }

        return await res.save();
    }
}

module.exports = new CartService();