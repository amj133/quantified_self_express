const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

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

  describe('GET /api/v1/meals', function() {
    this.timeout(0);
    it('should return all meals with foods', function() {
      return chai.request(server)
      .get('/api/v1/meals')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('Array');

        var meals = response.body.sort(function(a, b) {
          return(a.id > b.id ? 1 : -1)
        })

        meals[0].should.have.property('id');
        meals[0].id.should.equal(1);
        meals[0].should.have.property('name');
        meals[0].name.should.equal('Breakfast');
        meals[0].should.have.property('foods');

        meals[0].foods.should.be.a('Array');
        meals[0].foods[0].id.should.equal(1);;
        meals[0].foods[0].name.should.equal('Banana');;
        meals[0].foods[0].calories.should.equal(140);;

        meals[2].id.should.equal(3);
        meals[2].name.should.equal('Dinner');
        meals[2].foods[0].name.should.equal('Banana');
      })
    })
  })
})
