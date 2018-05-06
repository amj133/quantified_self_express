// import FoodMeal from "../models/food_meal"

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const FoodMeal = require('../models/food_meal')
// import { FoodMeal } from "../models/food_meal"

chai.use(chaiHttp);

describe('class methods', function() {
  this.timeout(0);
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  });

  describe('#findFoodMeals', function() {
    it('returns an array of food_meals', function() {
      let mealId = 1;

      FoodMeal.findFoodMeals(mealId)
      .then((response) => {
        let foodIds = response.rows;

        foodIds.should.be.a('Array');
        foodIds.length.should.equal(2);
        foodIds[0].id.should.equal(1);
        foodIds[0].food_id.should.equal(1);
        foodIds[0].meal_id.should.equal(1);

        foodIds[1].id.should.equal(2);
        foodIds[1].food_id.should.equal(2);
        foodIds[1].meal_id.should.equal(1);
      })
    })
  })

  describe('#getFoodIds', function() {
    xit('returns array of assoc. food ids', function() {
      let mealId = 1;

      let foodIds = FoodMeal.getFoodIds(mealId);

      foodIds.should.be.a('Array');
      foodIds[0].should.equal(1);
      foodIds[1].should.equal(2);
    })
  })
})
