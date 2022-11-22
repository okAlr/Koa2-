const path = require('path');

const {
    fileUploadError,
    unSupportedFileType,
    publishGoodsError,
    invalidGoodsId
} = require('../constants/err.type');

const {
    createGoods,
    updateGoods,
    removeGoods,
    restoreGoods,
    findGoods
} = require('../service/goods.servce');

class GoodsController {

    // 商品图片上传
    async upload(ctx, next) {
        // 一旦文件上传成功的话，文件的地址信息就会被放在 ctx.request.files 里面
        // console.log(ctx.request.files.imag); // 这个 imag 是 key 名
        const { file } = ctx.request.files || {};


        // 判断上传的文件类型
        const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];


        if (file) {
            // 这种判断文件的格式虽然抛出了错误，但是还是会将文件上传上去
            // 最好的办法就是配置一个中间件来专门验证上传的文件类型
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx);
            }


            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.filepath)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx);
        }

    }

    // 参数校验
    async create(ctx) {
        // 直接调用service的 createGoods 方法
        try {
            const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body);
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', publishGoodsError, ctx);
        }
    }

    // 修改商品的信息
    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body);
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsId, ctx);
            }
        } catch (error) {
            console.error(error);
        }
    }


    // 商品下架
    async remove(ctx) {
        try {
            const res = await removeGoods(ctx.params.id);
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '下架商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsId, ctx);
            }

        } catch (error) {
            console.error(error);
        }
    }

    // 商品上架
    async restore(ctx) {
        try {
            const res = await restoreGoods(ctx.params.id);
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '上架商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsId, ctx);
            }
        } catch (error) {
            console.error(error);
        }
    }


    // 获取所有商品数据接口
    async findAll(ctx) {
        try {
            // 1.解析 pageNum 和 pageSize
            console.log(ctx.request);
            const { pageNum = 1, pageSize = 10 } = ctx.request.query;
            // 2.调用数据处理的相关方法
            const res = await findGoods(pageNum, pageSize);
            ctx.body = {
                code: 0,
                message: '获取商品列表成功',
                result: res
            }

        } catch (error) {
            console.error(error);
        }

    }

}

module.exports = new GoodsController();