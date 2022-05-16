export function up(knex) {
  return knex.schema.createTable("users-saved-pets", function (table) {
    // table.integer("userId").unsigned().references("userId").inTable("users");
    // table.integer("petId").unsigned().references("petId").inTable("pets");
    // table.timestamp("created_at").defaultTo(knex.fn.now());
    //   table.primary([ "userId, petId" ]);
       table.integer("userId").unsigned();
       table.integer("petId").unsigned();
       table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("users-saved-pets");
}
