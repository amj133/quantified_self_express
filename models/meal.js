const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const Food = require('./food.js')
const FoodMeal = require('./food_meal.js')

class Meal {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.foods = []
  }

  static findAll() {
    return database.raw('SELECT * FROM meals')
  }
}


module.exports = Meal
