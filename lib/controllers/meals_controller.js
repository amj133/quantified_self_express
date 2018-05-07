const Meal = require('../../models/meal')
const Food = require('../../models/food')
const FoodMeal = require('../../models/food_meal')

const getMeals = (req, res) => {
  Meal.findAll()
    .then(function(meals) {
      res.json(meals.rows.map((meal) => {
        var meal = new Meal(meal.id, meal.name)
        FoodMeal.find(meal.id)
          .then((foodMeals) => {
            foodMeals.rows.forEach((foodMeal) => {
              Food.find(foodMeal.food_id)
                .then((foodInfo) => {
                  foodInfo = foodInfo.rows[0]
                  food = new Food(foodInfo.id, foodInfo.name, foodInfo.calories)
                  meal.foods.push(food)
                  // pry = require("pryjs")
                  // eval(pry.it)
                })
            })
          })
          pry = require("pryjs")
          eval(pry.it)
          return meal
      }))
    })
  //
  // Meal.findAll()
  //   .then(function(meals) {
  //     meals.rows.forEach((meal) => {
  //       meal = new Meal(meal.id, meal.name)
  //       FoodMeal.find(meal.id)
  //         .then((foodMeals) => {
  //           foodMeals.rows.forEach((foodMeal) => {
  //             Food.find(foodMeal.food_id)
  //               .then((foodInfo) => {
  //                   foodInfo = foodInfo.rows[0]
  //                   food = new Food(foodInfo.id, foodInfo.name, foodInfo.calories)
  //                   meal.foods.push(food)
  //                 // pry = require("pryjs")
  //                 // eval(pry.it)
  //               })
  //           })
  //         })
  //       mealsAndFoods.push(meal)
  //     })
  //     res.json(mealsAndFoods);
  //   })
}

module.exports = {
  getMeals
}
