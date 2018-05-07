const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Meal = require('../models/meal')

chai.use(chaiHttp);

describe('API Routes', function() {
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

  describe('instance methods', function() {
    this.timeout(0);
    describe('#getFoods', function(){
      it('should populate meal with foods', function() {
        meal = new Meal(1, "Breakfast")

        meal.foods.should.deep.equal([])

        meal.getFoods()

        meal.foods[0].id.should.equal(1)
        meal.foods[0].name.should.equal('Banana')
        meal.foods[0].calories.should.equal(140)

        meal.foods[1].id.should.equal(2)
        meal.foods[1].name.should.equal('Twizzler')
        meal.foods[1].calories.should.equal(240)
      })
    })
  })
})
