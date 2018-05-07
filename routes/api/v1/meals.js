var express = require('express');
var router = express.Router();

const mealsController = require('../../../lib/controllers/meals_controller')

router.get('/', mealsController.getMeals)
router.get('/:id/foods', mealsController.getFoodsForMeal)
router.post('/:meal_id/foods/:food_id', mealsController.addFoodToMeal)

module.exports = router;
