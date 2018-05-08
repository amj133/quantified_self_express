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

  describe('#find', function() {
    it('returns an array of food_meals', function() {
      let mealId = 1;

      return FoodMeal.find(mealId)
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

  describe('#create', function() {
    it('creates a food_meal record', async function() {
      let mealId = 2;
      let foodId = 1;

      const foodMeal = await FoodMeal.find(2)

      foodMeal.rows.length.should.equal(1)
      foodMeal.rows[0].food_id.should.equal(3)
      foodMeal.rows[0].meal_id.should.equal(2)

      await FoodMeal.create(foodId, mealId)
      const foodMealUpdated = await FoodMeal.find(2)

      foodMealUpdated.rows.length.should.equal(2)
      foodMealUpdated.rows[1].food_id.should.equal(1)
      foodMealUpdated.rows[1].meal_id.should.equal(2)
    })
  })

  describe('#destroy', function() {
    it('creates a food_meal record', async function() {
      let mealId = 1;
      let foodId = 1;

      const foodMeals = await FoodMeal.findAll()
      foodMeals.rows.length.should.equal(5)
      foodMeals.rows[0].meal_id.should.equal(1)
      foodMeals.rows[0].food_id.should.equal(1)

      await FoodMeal.destroy(1, 1)

      const foodMealsUpdated = await FoodMeal.findAll()

      foodMealsUpdated.rows.length.should.equal(4)
      foodMealsUpdated.rows[0].food_id.should.not.equal(1)
    })
  })
})
