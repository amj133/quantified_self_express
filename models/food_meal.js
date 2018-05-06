const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const findFoodMeals = (mealId) => {
  return database.raw('SELECT * FROM food_meals WHERE food_meals.meal_id = ?', [mealId])
}

const getFoodIds = (mealId) => {
  let foodIds = []

  findFoodMeals(mealId)
    .then((foodMeals) => {
      pry = require("pryjs")
      eval(pry.it)
      foodMeals.rows.forEach((foodMeal) => {
        foodIds.push(foodMeal.food_id)
      })
    })

  return foodIds
}

module.exports = {
  findFoodMeals,
  getFoodIds
}
