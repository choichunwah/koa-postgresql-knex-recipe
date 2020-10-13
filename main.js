// Lib
import Koa from 'koa';
import indexRoutes from './src/server/routes/index.js';
import recipesRoutes from './src/server/routes/recipes.js';

// Const
const app = new Koa();
const PORT = 8000;

// Middleware
app.use(indexRoutes.routes());
app.use(recipesRoutes.routes());

// Run
export const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});