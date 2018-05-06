const Meal = require('../../models/meal')
const Food = require('../../models/food')
const FoodMeal = require('../../models/food_meal')

const getMeals = (req, res) => {
  let mealsAndFoods = [];

  Meal.findAll()
    .then(function(meals) {
      meals.rows.forEach((meal) => {
        mealsAndFoods.push(meal)
        FoodMeal.findFoodMeals(meal.id)
          .then((foodMeals) => {
            foodMeals.rows.forEach((foodMeal) => {
              Food.find(foodMeal.food_id)
                .then((food) => {
                  mealsAndFoods.push(food.rows[0])
                })
            })
          })
      })
      // res.json(meals.rows)
    })
    pry = require("pryjs")
    eval(pry.it)
  return mealsAndFoods;
}

module.exports = {
  getMeals
}
