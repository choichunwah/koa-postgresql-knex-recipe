exports.up = async(knex, Promise) => {
    const hasUsersTable = await knex.schema.hasTable('users');
    if (!hasUsersTable) {
        await knex.schema.createTable('users', (table) => {
            table.increments();
            table.string("username").notNullable().unique();
            table.string("email").notNullable().unique();
            table.string("password");
            table.timestamps(false, true);
        });
    };

    const hasRecipesTable = await knex.schema.hasTable('recipes');
    if (!hasRecipesTable) {
        await knex.schema.createTable('recipes', (table) => {
            table.increments();
            table.string("name");
            table.integer("minute");
            table.string("ingredient");
            table.string("procedure");
            table.timestamps(false, true);
        })
    };

    const hasLikesTable = await knex.schema.hasTable("users_like_recipes")
    if (!hasLikesTable) {
        await knex.schema.createTable("users_like_recipes", (table) => {
            table.increments();
            table.integer("recipe_id").unsigned();
            table.foreign("recipe_id").references("recipes.id");
            table.integer("user_id").unsigned();
            table.foreign("user_id").references("users.id");
            table.timestamps(false, true);
        })
    }

    const hasCategoriesTable = await knex.schema.hasTable("categories")
    if (!hasCategoriesTable) {
        await knex.schema.createTable("categories", (table) => {
            table.increments();
            table.string('name').notNullable().unique();
            table.timestamps(false, true);
        })
    }

    const hasIngredientsTable = await knex.schema.hasTable("ingredients")
    if (!hasIngredientsTable) {
        await knex.schema.createTable("ingredients", (table) => {
            table.increments();
            table.string('name');
            table.integer("category_id").unsigned();
            table.foreign("category_id").references("categories.id");
            table.timestamps(false, true);
        })
    }

    const hasRsHaveIsTable = await knex.schema.hasTable("recipes_have_ingredients")
    if (!hasRsHaveIsTable) {
        await knex.schema.createTable("recipes_have_ingredients", (table) => {
            table.increments();
            table.integer("recipe_id").unsigned();
            table.foreign("recipe_id").references("recipes.id");
            table.integer("ingredient_id").unsigned();
            table.foreign("ingredient_id").references("ingredients.id");
            table.timestamps(false, true);
        })
    }
    return;
};

exports.down = (knex, Promise) => {
    knex.schema.dropTableIfExists("recipes_have_ingredients");
    knex.schema.dropTableIfExists("ingredients");
    knex.schema.dropTableIfExists("categories");
    knex.schema.dropTableIfExists("users_like_recipes");
    knex.schema.dropTableIfExists("recipes");
    knex.schema.dropTableIfExists('users');

    return;
};