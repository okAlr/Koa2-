const dotenv = require('dotenv');

dotenv.config();

console.log(process.env);
module.exports = process.env;

//像上面这样写的，就是可以把 .env 文件的东西读取到 config.default.js 文件上
// 并且会把 .env 文件的变量挂在到 process.env 上面
