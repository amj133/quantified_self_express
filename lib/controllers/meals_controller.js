const Meal = require('../../models/meal')

const getMeals = (req, res) => {
  Meal.findAll()
    .then(function(meals) {
      meals.rows.forEach((meal) => {
        console.log(meal)
      })
      res.json(meals.rows)
    })
}

module.exports = {
  getMeals
}
