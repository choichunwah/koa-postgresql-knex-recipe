import myKnex from '../connection.js';

export function getAllRecipes() {
    return myKnex('recipes')
        .select('*');
}

export function getSingleRecipe(id) {
    return myKnex('recipes')
        .select('*')
        .where({ id: parseInt(id) });
}