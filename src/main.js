// main.js 文件是全局的入口文件
const app=require('./app/index')
const { APP_PORT } = require('./config/config.default');

app.use((ctx, next) => {
    ctx.body = 'hello api';
})

app.listen(8000, () => {
    console.log(`http://127.0.0.1:8000`);
})