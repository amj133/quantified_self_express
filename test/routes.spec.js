const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', function() {
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

  describe('GET /api/v1/foods', function() {
    it('should return all foods', function() {
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('Array');

        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Banana');

        response.body[2].id.should.equal(3);
        response.body[2].name.should.equal('Advocado');
      })
    })
  })

  describe('GET /api/v1/foods/:id', function() {
    xit('should return given food', function() {
      return chai.request(server)
      .get('/api/v1/foods/2')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('Array');

        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(2);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Twizzler');
      })
    })
  })

  describe('POST /api/v1/foods/', function () {
    it('should create and return food', function () {
      let payload = {
        "food": {
          "name": "Gogurt",
          "calories": 220
        }
      }

      return chai.request(server)
      .post('/api/v1/foods')
      .send(payload)
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('Object');

        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Gogurt');
        response.body[0].should.have.property('calories');
        response.body[0].name.should.equal(220);
      })
    })
  })
})
