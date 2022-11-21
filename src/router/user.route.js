const Router = require('koa-router');
const router = new Router({ prefix: '/users' });

const { userValidator, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware');
const { register, login,changePassword  } = require('../controller/user.controller');

const { auth } = require('../middleware/auth.middleware');

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

// 登陆接口
router.post('/login', userValidator, verifyLogin, login);

// 修改密码接口
router.patch('/', auth, crpytPassword, changePassword);

module.exports = router;
