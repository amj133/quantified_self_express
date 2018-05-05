const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const Food = require('./food.js')

const findAll = () => {
  return database.raw('SELECT * FROM meals')
}

module.exports = {
  findAll
}
