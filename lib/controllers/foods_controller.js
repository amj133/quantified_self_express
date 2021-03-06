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

const createFood = async (req, res) => {
  let name = req.body.food.name;
  let calories = req.body.food.calories;

  if(name != undefined && calories != undefined) {
    const rawFood = await Food.create(name, calories)
    const food = new Food(rawFood.rows[0].id, rawFood.rows[0].name, rawFood.rows[0].calories)
    res.json(food)
  } else {
    res.sendStatus(404)
  }
}

const updateFood = (req, res) => {
  let id = req.params.id;
  let name = req.body.food.name;
  let calories = req.body.food.calories;

  if(name != undefined && calories != undefined) {
    Food.update(name, calories, id)
      .then(function(food) {
        res.json(food.rows)
      })
  } else {
    res.sendStatus(400)
  }
}

const deleteFood = (req, res) => {
  let id = req.params.id;

  Food.find(id)
    .then(function(food) {
      if(food.rows.length === 0) {
        return res.sendStatus(404)
      } else {
        Food.destroy(id)
          .then(function() {
            res.sendStatus(204)
          })
      }
    })

}

module.exports = {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood
}
