export function up(knex) {
  return knex.schema.alterTable("pets", function (table) {
    table.renameColumn("hypoallergnic", "hypoallergenic");
    table.renameColumn("dietery", "dietary");
    table.integer("ownerId");
  });
}
export function down(knex) {
  return knex.schema.dropTable("pets");
}
