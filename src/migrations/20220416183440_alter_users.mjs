export function up(knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("hash_password");
  });
}
export function down(knex) {
  return knex.schema.dropTable("users");
}
