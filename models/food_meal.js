const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class FoodMeal {
  constructor (id, foodId, mealId) {
    this.id = id;
    this.foodId = foodId;
    this.mealId = mealId;
  }

  static findFoodMeals(mealId) {
    return database.raw('SELECT * FROM food_meals WHERE food_meals.meal_id = ?', [mealId])
  }

}

module.exports = FoodMeal
