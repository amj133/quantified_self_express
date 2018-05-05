exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Banana", 140, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Twizzler", 240, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ["Advocado", 340, new Date, new Date]
      )
    ])
  })
}
