export function up(knex) {
  return knex.schema.alterTable("users", function (table) {
      table.renameColumn("hash_password", "hashPassword");
      table.renameColumn("re_password", "rePassword")
  });
}
export function down(knex) {
  return knex.schema.dropTable("users");
}
