const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class FoodMeal {
  constructor (id, foodId, mealId) {
    this.id = id;
    this.foodId = foodId;
    this.mealId = mealId;
  }

  static findAll() {
    return database.raw('SELECT * FROM food_meals')
  }

  static find(mealId) {
    return database.raw('SELECT * FROM food_meals WHERE food_meals.meal_id = ?', [mealId])
  }

  static create(foodId, mealId) {
    return database.raw('INSERT INTO food_meals (food_id, meal_id) VALUES (?, ?)', [foodId, mealId])
  }

  static destroy(foodId, mealId) {
    return database.raw('DELETE FROM food_meals WHERE food_id = ? AND meal_id = ?', [foodId, mealId])
  }

}

module.exports = FoodMeal
