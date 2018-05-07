var express = require('express');
var router = express.Router();

const mealsController = require('../../../lib/controllers/meals_controller')

router.get('/', mealsController.getMeals)
router.get('/:id/foods', mealsController.getFoodsForMeal)

module.exports = router;
