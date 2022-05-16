export function up(knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("isAdmin");
      table.boolean("admin").notNull().defaultTo(0);
  });
}
export function down(knex) {
  return knex.schema.dropTable("users");
}
