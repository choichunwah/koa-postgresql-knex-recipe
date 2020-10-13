// Lib
import Koa from 'koa';

// Route
import indexRoutes from './src/server/routes/index';
import recipesRoutes from './src/server/routes/recipes';

// Const
const app = new Koa();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(indexRoutes.routes());
app.use(recipesRoutes.routes());

// Run
export const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    console.log(`process.env.NODE_ENV ${process.env.NODE_ENV}`)
});