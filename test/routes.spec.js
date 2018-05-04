const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app.js');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('GET /api/v1/foods', function() {
  it('should return all foods', function() {
    return chai.request(server)
      .get('/foods')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('Array');
        
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('message');
        response.body[0].message.should.equal('1');

        response.body[2].id.should.equal(3);
        response.body[2].message.should.equal('1');
      })
      .catch((error) => {
        throw error;
      })
  })
})