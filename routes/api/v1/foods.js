var express = require('express');
var router = express.Router();

const Food = require('../../../models/food')
const foodsController = require('../../../lib/controllers/foods')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

// router.get('/', foodsController.getFoods)

router.get('/', function(req, res) {
  database.raw('SELECT * FROM foods')
    .then((foods) => {
      if(!foods.rows) {
        return res.sendStatus(404)
      } else {
        res.json(foods.rows)
      }
    })
})

module.exports = router;
