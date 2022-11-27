const Router = require('koa-router');
const router = new Router({ prefix: '/address' });

const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/addr.middleware');

const { create,findAll } = require('../controller/addr.controller');

// 添加接口：登陆，格式     
router.post('/', auth, validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1[34578]\d{9}$/g },
    address: 'string'
}), create)


// 获取地址列表
router.get('/', auth, findAll);

module.exports = router;