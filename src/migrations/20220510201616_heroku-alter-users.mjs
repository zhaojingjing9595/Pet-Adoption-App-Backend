export function up(knex) {
    return knex.schema.alterTable("users", function (table) {
      table.renameColumn("id", "userId");
      table.renameColumn("first_name", "firstName");
      table.renameColumn("last_name", "LastName");
      table.renameColumn("phone_number", "phoneNumber");
  });
}
export function down(knex) {
  return knex.schema.dropTable("users");
}
