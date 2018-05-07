const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  constructor(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  static findAll() {
    return database.raw('SELECT * FROM foods');
  }

  static find(id) {
    return database.raw('SELECT * FROM foods WHERE foods.id = ?', [id])
  }

  static create(name, calories) {
    return database.raw('INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING id, name, calories', [name, calories])
  }

  static update(name, calories, id) {
    return database.raw('UPDATE foods SET name = ?, calories = ? WHERE foods.id = ? RETURNING id, name, calories', [name, calories, id])
  }

  static destroy(id) {
    return database.raw('DELETE FROM foods WHERE foods.id = ?', [id])
  }
}

module.exports = Food
