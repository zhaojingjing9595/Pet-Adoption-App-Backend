export function up(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("email").unique().notNull();
    table.string("password").notNull();
    table.string("re_password").notNull();
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.string("phone_number").notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}
