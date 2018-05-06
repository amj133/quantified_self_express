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
    it('should return all meals with foods', function() {
      return chai.request(server)
      .get('/api/v1/meals')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('Array');

        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Breakfast');
        response.body[0].should.have.property('foods');

        response.body[0].foods.should.be.a('Array');
        response.body[0].foods[0].id.should.equal(1);;
        response.body[0].foods[0].name.should.equal('Banana');;
        response.body[0].foods[0].calories.should.equal(140);;

        response.body[2].id.should.equal(3);
        response.body[2].name.should.equal('Dinner');
        response.body[2].food[0].name.should.equal('Steak');
      })
    })
  })
})
