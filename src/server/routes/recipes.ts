// Lib
import Router from 'koa-router';
const router = new Router();

// Services
import * as queries from '../db/queries/recipes';

// Const 
const BASE_URL = `/recipes`;

// Routes
router.get(`${BASE_URL}`, async(ctx) => {
    try {
        const recipes = await queries.getAllRecipes();
        if (recipes.length) {
            ctx.body = {
                status: 'success',
                data: recipes
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'Recipes do not exist.'
            };
        };
    } catch (err) {
        console.log(err)
    };
});

router.get(`${BASE_URL}/:id`, async(ctx) => {
    try {
        const recipe = await queries.getSingleRecipe(ctx.params.id);
        if (recipe.length) {
            ctx.body = {
                status: 'success',
                data: recipe
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That recipe does not exist.'
            };
        };
    } catch (err) {
        console.log(err)
    };
});

// Export 
export default router;