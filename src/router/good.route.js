const Router = require('koa-router');


const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
const { upload } = require('../controller/goods.controller');
const {validator} = require('../middleware/goods.middleware');

const router = new Router({ prefix: '/goods' });

// 商品图片上传接口
router.post('/upload', auth, hadAdminPermission, upload);


// 发布商品接口
router.post('/', auth, hadAdminPermission, validator);


module.exports = router;