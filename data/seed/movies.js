/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const movies = [
  {movie_id: 1, movie_name: 'Harry Potter ve Felsefe Taşı', time: '192min'},
  {movie_id: 2, movie_name: 'Yüzüklerin Efendisi: İki Kule', time: '179min'},
  {movie_id: 3, movie_name: 'Star Wars: Son Jedi', time: '152min'}
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').truncate()
  await knex('movies').insert(movies);
};
