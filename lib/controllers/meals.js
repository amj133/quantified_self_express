const Meal = require('../../models/meal')

const getMeals = (req, res) => {
  Meal.findAll()
    .then(function(meals) {
      res.json(meals.rows)
    })
}

module.exports = {
  getMeals
}
