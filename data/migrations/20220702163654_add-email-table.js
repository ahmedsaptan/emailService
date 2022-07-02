exports.up = function (knex) {
  return knex.schema.createTable("emails", function (table) {
    table.increments("id").primary();
    table.string('from');
    table.string('to');
    table.string('subject');
    table.string('text', 5000);
    table.string('html', 5000);
    table.string('provider');
    table.boolean('send').defaultTo(false);
    table
    .dateTime("created_at")
    .notNullable()
    .defaultTo(knex.raw("CURRENT_TIMESTAMP"));

  table
    .dateTime("updated_at")
    .notNullable()
    .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.charset("utf8mb4");
    table.collate("utf8mb4_bin");
  });

};

exports.down = function (knex) {
  return knex.schema.dropTable("emails");
};
