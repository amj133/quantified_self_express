exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (id, name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [1, "Banana", 140, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (id, name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [2, "Twizzler", 240, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (id, name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [3, "Advocado", 340, new Date, new Date]
      )
    ])
  })
}
