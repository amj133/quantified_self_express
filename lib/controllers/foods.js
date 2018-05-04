const Food = require('../../models/food')

const getFoods = (req, res) => {
  Food.all
    .then(function(foods) {
      if(!foods.rows) {
        return res.sendStatus(404)
      } else {
        res.json(foods.rows)
      }
    })
}

module.exports = {
  getFoods
}
