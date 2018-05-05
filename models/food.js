const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const findAll = () => {
  return database.raw('SELECT * FROM foods');
}

const find = (id) => {
  return database.raw('SELECT * FROM foods WHERE foods.id = ?', [id])
}

module.exports = {
  findAll,
  find
}
