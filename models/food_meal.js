const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const getFoodIds = (mealId) => {
  return database.raw('SELECT * FROM food_meals WHERE food_meals.meal_id = ?', [mealId])
}

module.exports = {
  getFoodIds
}
