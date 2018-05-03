
exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return knex('foods').insert([
        {id: 1, name: 'Banana'},
        {id: 2, name: 'Twizzler'},
        {id: 3, name: 'Advocado'}
      ]);
    });
};
