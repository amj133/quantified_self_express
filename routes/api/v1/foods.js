var express = require('express');
var router = express.Router();

const Food = require('../../../models/food')
const foodsController = require('../../../lib/controllers/foods')

router.get('/', foodsController.getFoods)

module.exports = router;
