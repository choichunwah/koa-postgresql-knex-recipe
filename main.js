// Lib 
const Koa = require('koa');
const indexRoutes = require('./src/server/routes/index');
const recipesRoutes = require('./src/server/routes/recipes');

// Const
const app = new Koa();
const PORT = 3000;

// Middleware
app.use(indexRoutes.routes());
app.use(recipesRoutes.routes());

// Run
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;