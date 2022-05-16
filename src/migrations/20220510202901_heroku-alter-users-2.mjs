export function up(knex) {
  return knex.schema.alterTable("users", function (table) {
    table.renameColumn("created_at", "createdAt");
  });
}
export function down(knex) {
  return knex.schema.dropTable("users");
}
