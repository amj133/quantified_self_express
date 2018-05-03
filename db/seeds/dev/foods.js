exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, created_at, updated_at) VALUES (?, ?, ?)',
        ["Banana", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, created_at, updated_at) VALUES (?, ?, ?)',
        ["Twizzler", new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, created_at, updated_at) VALUES (?, ?, ?)',
        ["Advocado", new Date, new Date]
      )
    ])
  })
}
