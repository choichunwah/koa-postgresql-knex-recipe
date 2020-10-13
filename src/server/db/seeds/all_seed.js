// Lib 
const fs = require('fs');
const util = require('util');
const XLSX = require('xlsx');

// Util
const writeFile = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile); 

// Const 
const today = '20200926'

exports.seed = async(knex, Promise) => {
    // Delete ALL existing entries
    await knex("recipes_have_ingredients").del();
    await knex("ingredients").del();
    await knex("categories").del();
    await knex("users_like_recipes").del();
    await knex("recipes").del();
    // await knex("users").del()

    // Insert recipes
    const workbook = XLSX.readFile("./src/server/db/seeds/自己肯做飯食譜-20200926.xlsx");
    const sheetName = workbook.SheetNames[0];
    const recipeData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

    let recipesTable = []

    let n = 1
    for (let item of recipeData) {
        await knex("recipes").insert([{
            id: n,
            minute: parseInt(item['minute']),
            name: item['name'],
            ingredient: item['ingredient'],
            procedure: item['procedure']
        }]);
        recipesTable.push({
            id: n,
            minute: parseInt(item['minute']),
            name: item['name'],
            ingredient: item['ingredient'],
            procedure: item['procedure']
        })
        n++
    }

    // Separate ingredients and descriptions
    let recipesTableSeparatingIngredientsAndDescriptions = []

    for (let item of recipesTable) {
        const ingredientsArray = item['ingredient'].split(', ')
        let newIngredientsArray = []
        for (let ingredientItem of ingredientsArray) {
            let obj = {}
            let ingredientNameWithCategory
            let ingredientName
            let ingredientCategoryNo

            if (ingredientItem.indexOf(' ') > 0 && ingredientItem.indexOf(' ') < ingredientItem.length - 1) {
                let str = ingredientItem
                ingredientNameWithCategory = str.substr(0, str.indexOf(' '))

                ingredientName = ingredientNameWithCategory
                ingredientName = ingredientName.slice(0, ingredientName.length - 1)

                ingredientCategoryNo = ingredientNameWithCategory
                ingredientCategoryNo = ingredientCategoryNo.slice(-1)

                const ingredientDescription = str.substr(str.indexOf(' ') + 1)

                obj = {
                    ingredient_name: ingredientName,
                    ingredient_description: ingredientDescription,
                    ingredient_category_no: ingredientCategoryNo
                }
            } else {
                ingredientName = ingredientItem
                ingredientName = ingredientName.slice(0, ingredientName.length - 1)

                ingredientCategoryNo = ingredientItem
                ingredientCategoryNo = ingredientCategoryNo.slice(-1)

                obj = {
                    ingredient_name: ingredientName,
                    ingredient_description: '',
                    ingredient_category_no: ingredientCategoryNo
                }
            }
            newIngredientsArray.push(obj)
        }
        recipesTableSeparatingIngredientsAndDescriptions.push({
            id: item.id,
            minute: item['minute'],
            recipe_name: item['name'],
            ingredient_list: newIngredientsArray,
            detail: item['detail']
        })
    }
    await writeFile(`./src/server/db/seeds/${today}/recipesTable.txt`, JSON.stringify(recipesTable, null, 2))
    await writeFile(`./src/server/db/seeds/${today}/recipesTableSeparatingIngredientsAndDescriptions.txt`, JSON.stringify(recipesTableSeparatingIngredientsAndDescriptions, null, 2))

    // Insert categories
    const categoryList = ['穀物', '蔬果', '肉', '海產', '蛋、奶及代替品', '調味及配料']
    let n4 = 1
    for (let item of categoryList) {
        await knex("categories").insert([{
            id: n4,
            name: item
        }])
        n4++
    }
    await writeFile(`./src/server/db/seeds/${today}/categoryList.txt`, JSON.stringify(categoryList, null, 2))

    // Insert ingredients
    let ingredientsTableWithRepetitions = []
    let ingredientsTableWithoutRepetitions = []
    for (let item of recipesTableSeparatingIngredientsAndDescriptions) {
        for (let ingredient of item.ingredient_list) {
            ingredientsTableWithRepetitions.push({
                recipe_id: item.id,
                recipe_name: item.recipe_name,
                ingredient_name: ingredient['ingredient_name'],
                ingredient_description: ingredient['ingredient_description'],
                ingredient_category_no: ingredient['ingredient_category_no']
            })
        }
    }

    ingredientsTableWithoutRepetitions = Array.from(new Set(ingredientsTableWithRepetitions.map(item => {
        return JSON.stringify({
            ingredient_name: item.ingredient_name,
            ingredient_category_no: item.ingredient_category_no
        })
    })))

    let ingredientsTable = []
    let n2 = 1
    for (let item of ingredientsTableWithoutRepetitions) {
        let json = JSON.parse(item)
        await knex("ingredients").insert([
            { id: n2, name: json.ingredient_name, category_id: json.ingredient_category_no }
        ])
        ingredientsTable.push({ id: n2, ingredient_name: json.ingredient_name, category_id: json.ingredient_category_no })
        n2++
    }
    await writeFile(`./src/server/db/seeds/${today}/ingredientsTableWithRepetitions.txt`, JSON.stringify(ingredientsTableWithRepetitions, null, 2))
    await writeFile(`./src/server/db/seeds/${today}/ingredientsTableWithoutRepetitions.txt`, JSON.stringify(ingredientsTableWithoutRepetitions, null, 2))
    await writeFile(`./src/server/db/seeds/${today}/ingredientsTable.txt`, JSON.stringify(ingredientsTable, null, 2))

    // Insert recipes_ingredients
    let recipesIngredientsTable = []
    let n3 = 1
    for (let item of ingredientsTableWithRepetitions) {
        for (let ingredient of ingredientsTable) {
            if (item.ingredient_name === ingredient.ingredient_name) {
                recipesIngredientsTable.push({
                    id: n3,
                    ingredient_id: ingredient.id,
                    ingredient_name: ingredient.ingredient_name,
                    recipe_id: item.recipe_id,
                    recipe_name: item.recipe_name
                })
                n3++
            }
        }
    }

    for (let item of recipesIngredientsTable) {
        await knex("recipes_have_ingredients").insert([
            { id: item.id, ingredient_id: item.ingredient_id, recipe_id: item.recipe_id }
        ])
    }

    await writeFile(`./src/server/db/seeds/${today}/recipesIngredientsTable.txt`, JSON.stringify(recipesIngredientsTable, null, 2))
}