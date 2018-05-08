const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Food = require('../models/food')

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

  describe('#findAll', function(){
    it('returns all foods', async function() {
      const rawFoods = await Food.findAll()

      rawFoods.rows.length.should.equal(3)
      rawFoods.rows[0].id.should.equal(1)
      rawFoods.rows[0].name.should.equal('Banana')
      rawFoods.rows[0].calories.should.equal(140)

      rawFoods.rows[2].name.should.equal('Avocado')
    })
  })

  describe('#find', function(){
    it('returns given food', async function() {
      const rawFoods = await Food.find(2)

      rawFoods.rows.length.should.equal(1)
      rawFoods.rows[0].id.should.equal(2)
      rawFoods.rows[0].name.should.equal('Twizzler')
      rawFoods.rows[0].calories.should.equal(240)
    })
  })

  describe('#create', function(){
    it('creates food', async function() {
      const rawFoods = await Food.findAll()

      rawFoods.rows.length.should.equal(3)

      await Food.create("Salmon", 360)
      const rawFoodsUpdated = await Food.findAll()

      rawFoodsUpdated.rows.length.should.equal(4)
      rawFoodsUpdated.rows[3].name.should.equal('Salmon')
      rawFoodsUpdated.rows[3].calories.should.equal(360)
    })
  })

  describe('#update', function(){
    it('updates food', async function() {
      const rawFoods = await Food.findAll()

      rawFoods.rows.length.should.equal(3)
      rawFoods.rows[0].name.should.equal('Banana')
      rawFoods.rows[0].calories.should.equal(140)

      await Food.update("Salmon", 360, 1)
      const rawFoodsUpdated = await Food.findAll()
      rawFoodsUpdated.rows.sort(function(a, b) {
        return(a.id > b.id ? 1 : -1)
      })

      rawFoodsUpdated.rows.length.should.equal(3)
      rawFoodsUpdated.rows[0].name.should.equal('Salmon')
      rawFoodsUpdated.rows[0].calories.should.equal(360)
    })
  })

  describe('#destory', function(){
    it('destroys food', async function() {
      const rawFoods = await Food.findAll()

      rawFoods.rows.length.should.equal(3)
      rawFoods.rows[0].name.should.equal('Banana')
      rawFoods.rows[0].calories.should.equal(140)

      await Food.destroy(1)
      const rawFoodsUpdated = await Food.findAll()

      rawFoodsUpdated.rows.length.should.equal(2)
      rawFoodsUpdated.rows[0].name.should.equal('Twizzler')
      rawFoodsUpdated.rows[1].name.should.equal('Avocado')
    })
  })
})
