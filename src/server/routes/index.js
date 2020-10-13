// Lib
import Router from 'koa-router';
const router = new Router();

// Route
router.get('/', async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
});

export default router;