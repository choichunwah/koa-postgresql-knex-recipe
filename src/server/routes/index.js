// Lib
const Router = require('koa-router');
const router = new Router();

// Route
router.get('/', async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
});

// Export
module.exports = router;