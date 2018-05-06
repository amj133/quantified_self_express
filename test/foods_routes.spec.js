const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Food = require('../models/food')

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
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(140);

        response.body[2].id.should.equal(3);
        response.body[2].name.should.equal('Advocado');
      })
    })
  })

  describe('GET /api/v1/foods/:id', function() {
    it('should return given food', function() {
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
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(240);
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
          response.body.should.be.a('Array');

          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Gogurt');
          response.body[0].should.have.property('calories');
          response.body[0].calories.should.equal(220);
          // let newFood = Food.find(4)
          //                 .then(function(food) {
          //                   return food.rows
          //                 })
          // pry = require("pryjs")
          // eval(pry.it)
          // newFood.id.should.equal(4);
          // newFood.name.should.equal('Gogurt');
        })
    })

    it('should return 404 with no name', function () {
      let payload = {
        "food": {
          "calories": 220
        }
      }

      return chai.request(server)
      .post('/api/v1/foods')
      .send(payload)
      .then((response) => {
        response.should.have.status(404);
      })
    })

    it('should return 404 with no calories', function () {
      let payload = {
        "food": {
          "name": "Gogurt"
        }
      }

      return chai.request(server)
      .post('/api/v1/foods')
      .send(payload)
      .then((response) => {
        response.should.have.status(404);
      })
    })
  })

  describe('PATCH /api/v1/foods/:id', function() {
    it('updates food and returns updated', function() {
      let payload = {
        "food": {
          "name": "Gogurt",
          "calories": 220
        }
      }

      return chai.request(server)
      .patch('/api/v1/foods/2')
      .send(payload)
      .then((response) => {
        // let updatedFood = Food.find(2)
        //                     .then(function(food) {
        //                       return food.rows
        //                     })
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('Array');

        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(2);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Gogurt');
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(220);
      })
    })

    it('returns 400 with no name', function() {
      let payload = {
        "food": {
          "calories": 220
        }
      }

      return chai.request(server)
      .patch('/api/v1/foods/2')
      .send(payload)
      .then((response) => {
        response.should.have.status(400);
      })
    })

    it('returns 400 with no calories', function() {
      let payload = {
        "food": {
          "name": "Gogurt"
        }
      }

      return chai.request(server)
      .patch('/api/v1/foods/2')
      .send(payload)
      .then((response) => {
        response.should.have.status(400);
      })
    })
  })

  describe("DELETE /api/v1/foods/:id", function() {
    xit("deletes the food", function() {
      chai.request(server)
      .delete('/api/v1/foods/2')

      pry = require("pryjs")
      eval(pry.it)

      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        response.body.length.should.equal(2);
      })
    })

    it("returns 204", function() {
      return chai.request(server)
      .delete('/api/v1/foods/2')
      .then((response) => {
        response.should.have.status(204);
      })
    })

    it("returns a 404 if food not found", function() {
      return chai.request(server)
      .delete('/api/v1/foods/4')
      .then((response) => {
        response.should.have.status(404);
      })
    })
  })
})
