exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE food_meals RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [1, 1]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [2, 1]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [3, 2]
      )
    ])
  })
}
