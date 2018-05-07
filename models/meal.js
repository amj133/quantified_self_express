const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const FoodMeal = require('../models/food_meal')
const Food = require('../models/food')

pry = require("pryjs")
class Meal {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.foods = []
  }

  static findAll() {
    return database.raw('SELECT * FROM meals')
  }

  getFoods() {
    return database.raw('SELECT foods.id, foods.name, foods.calories FROM foods INNER JOIN food_meals ON foods.id = food_meals.food_id WHERE food_meals.meal_id = ?', [this.id])
      .then((foods) => {
        foods.rows.forEach((food) => {
          let newFood = new Food(food.id, food.name, food.calories)
          this.foods.push(newFood)
        })
      })
  }
}


module.exports = Meal
