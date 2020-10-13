import myKnex from '../connection';

export const getAllRecipes = () => {
    return myKnex('recipes')
        .select('*');
}

export const getSingleRecipe = (id) => {
    return myKnex('recipes')
        .select('*')
        .where({ id: parseInt(id) });
}