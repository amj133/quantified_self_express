const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const findAll = () => {
  return database.raw('SELECT * FROM foods');
}

const find = (id) => {
  return database.raw('SELECT * FROM foods WHERE foods.id = ?', [id])
}

const create = (name, calories) => {
  return database.raw('INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING id, name, calories', [name, calories])
}

module.exports = {
  findAll,
  find,
  create
}
