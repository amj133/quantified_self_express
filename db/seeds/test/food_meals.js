exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE food_meals RESTART IDENTITY')
  .then(async function() {
    return Promise.all([
      await knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [1, 1]
      ),
      await knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [2, 1]
      ),
      await knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [3, 2]
      ),
      await knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [1, 3]
      ),
      await knex.raw(
        'INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)',
        [2, 4]
      )
    ])
  })
}
