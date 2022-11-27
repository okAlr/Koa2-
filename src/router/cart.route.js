// 1.导入 koa-router
const Router = require('koa-router');

// 中间件
const { auth } = require('../middleware/auth.middleware');
const { validator } = require('../middleware/cart.middleware');

// 控制器
const { add, findAll } = require('../controller/cart.controller');



// 2. 实例化 router 对象
const router = new Router({ prefix: '/carts' });

// 3. 编写路由规则

// 添加到购物车：登陆，格式
// 待优化：在执行add之前，还需要检查传来的 user_id 和 goods_id 是否合法（新增中间件）
router.post('/', auth, validator, add);

// 获取购物车列表
router.get('/', auth, findAll);


// 更新购物车
router.patch('/:id', auth);

// 4. 导出 router 对象
module.exports = router;


