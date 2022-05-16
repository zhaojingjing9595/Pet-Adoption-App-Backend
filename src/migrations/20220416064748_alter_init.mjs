export function up(knex) {
  return knex.schema.alterTable("init", function (table) {
    table.dropColumn("password");
    table.renameColumn("id", "userId");
    table.string("password_hash").notNull();
  });
}
export function down(knex) {
  return knex.schema.dropTable("init");
}
