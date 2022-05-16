export function up(knex) {
  return knex.schema.createTable("pets", function (table) {
    table.increments("petId").primary();
    table.string("type").notNull();
      table.string("name").notNull();
    table.string("adoptionStatus").notNull();
      table.string("picture").notNull();
      table.string("breed");
      table.float("height");
      table.float("weight");
      table.string("color");
      table.text("bio");
     table.boolean("hypoallergnic");
     table.string("dietery");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("pets");
}
