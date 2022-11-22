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

    async restoreGoods(id){
        const res = await Goods.restore({ where: { id } });
        return res > 0 ? true : false;
    }

}

module.exports = new GoodsService();