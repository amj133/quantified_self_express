const Food = require('../../models/food')

const getFoods = (req, res) => {
  Food.findAll()
    .then(function(foods) {
      if(!foods.rows) {
        return res.sendStatus(404)
      } else {
        res.json(foods.rows)
      }
    })
}

const getFood = (req, res) => {
  let id = req.params.id

  Food.find(id)
    .then(function(food) {
      if(!food.rows) {
        return res.sendStatus(404)
      } else {
        res.json(food.rows)
      }
    })
}

const createFood = (req, res) => {
  let name = req.body.food.name;
  let calories = req.body.food.calories;

  Food.create(name, calories)
    .then(function(food) {
      if(!food.rows) {
        return res.sendStatus(400)
      } else {
        res.json(food.rows)
      }
    })
}

module.exports = {
  getFoods,
  getFood,
  createFood
}
