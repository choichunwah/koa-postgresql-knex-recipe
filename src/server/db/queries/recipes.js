const knex = require('../connection');

function getAllRecipes() {
    return knex('recipes')
        .select('*');
}

function getSingleRecipe(id) {
    return knex('recipes')
        .select('*')
        .where({ id: parseInt(id) });
}

module.exports = {
    getAllRecipes,
    getSingleRecipe
};