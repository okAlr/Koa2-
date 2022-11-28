const Order = require('../model/order.model');
const { Op } = require('sequelize');

class OrderService {
    async createOrder(order) {
        return await Order.create(order)
    }

    async findAllOrder(user_id, pageNum, pageSize, status) {
        try {
            const { count, rows } = await Order.findAndCountAll({
                attributes: ['goods_info', 'total', 'order_number', 'status'],
                where: {
                    [Op.and]: {
                        user_id,
                        status
                    }
                },
                offset: (pageNum - 1) * pageSize,
                limit: pageSize * 1
            })

            return {
                pageNum,
                pageSize,
                total: count,
                list: rows
            }
        } catch (error) {
            console.error(error);
        }
    }


    async updateOrder(user_id, id, status) {
        // 根据id去修改 status 的值
        return await Order.update({ status }, {
            where: {
                [Op.and]: {
                    user_id,
                    id
                }
            }
        })
    }
}

module.exports = new OrderService();