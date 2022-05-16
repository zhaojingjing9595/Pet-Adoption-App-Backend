export function up(knex) {
    return knex.schema.createTable("saved-pets", function (table) {
        table.integer("userId").unsigned().references("userId").inTable("users");
        table.integer("petId").unsigned().references("petId").inTable("pets");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.primary(["userId, petId"])
    })
}

export function down(knex) {
  return knex.schema.dropTable("saved-pets");
}
