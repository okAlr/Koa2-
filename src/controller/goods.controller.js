const path = require('path');

const { fileUploadError, unSupportedFileType, publishGoodsError } = require('../constants/err.type');
const { createGoods } = require('../service/goods.servce');

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

}

module.exports = new GoodsController();