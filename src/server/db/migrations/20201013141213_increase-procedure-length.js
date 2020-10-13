exports.up = async(knex) => {
    await knex.schema.table('recipes', table => {
        table.string('procedure', 10000).alter()
    })
};

exports.down = async(knex) => {
    await knex.schema.table('recipes', table => {
        table.string('procedure', 255).alter()
    })
};