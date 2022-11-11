// main.js 文件是全局的入口文件
const app = require('./app/index')
const { APP_PORT } = require('./config/config.default');

app.use((ctx, next) => {
    ctx.body = 'hello api';
})

app.listen(APP_PORT, () => {
    console.log(`http://127.0.0.1:${APP_PORT}`);
})