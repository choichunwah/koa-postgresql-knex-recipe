// lib 
const Koa = require('koa');

// const
const app = new Koa();
const PORT = 3000;

// main
app.use(async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
});

// run
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;