export function up(knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("bio");
    table.boolean("isAdmin");
  });
}
export function down(knex) {
  return knex.schema.dropTable("users");
}
