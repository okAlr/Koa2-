const Goods = require('../model/goods.model');

class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods);
        return res.dataValues;
    }

    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } });
        return res[0] > 0 ? true : false;
    }

    // 配置了 paranoid 这个参数的话，调用 destory 方法就是更新 deleteAt 字段的时间
    // 如果没有配置那个字段，那 调用 destory 就是直接从数据库删除（硬删除）
    async removeGoods(id) {
        const res = await Goods.destroy({ where: { id } });
        return res > 0 ? true : false;
    }

    async restoreGoods(id) {
        const res = await Goods.restore({ where: { id } });
        return res > 0 ? true : false;
    }


    // 懒加载+分页的处理
    async findGoods(pageNum, pageSize) {
        // 1.获取总数
        // const count = await Goods.count();
        // console.log(count);
        // // 2.获取分页的具体数据
        // const offset = (pageNum - 1) * pageSize;
        // const rows = Goods.findAll({ offset, limit: pageSize * 1 })

        // 优化方式
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Goods.findAndCountAll({
            offset,
            limit: pageSize * 1
        })

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

}

module.exports = new GoodsService();