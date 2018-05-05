var express = require('express');
var router = express.Router();

const Food = require('../../../models/food')
const foodsController = require('../../../lib/controllers/foods_controller')

router.get('/', foodsController.getFoods)
router.get('/:id', foodsController.getFood)
router.post('/', foodsController.createFood)
router.patch('/:id', foodsController.updateFood)
router.delete('/:id', foodsController.deleteFood)

module.exports = router;
