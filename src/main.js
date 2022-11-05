const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello api';
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})