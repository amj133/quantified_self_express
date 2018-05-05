var express = require('express');
var router = express.Router();

const Food = require('../../../models/food')
const foodsController = require('../../../lib/controllers/foods')

router.get('/', foodsController.getFoods)

router.get('/:id', foodsController.getFood)

router.post('/', foodsController.createFood)

module.exports = router;
