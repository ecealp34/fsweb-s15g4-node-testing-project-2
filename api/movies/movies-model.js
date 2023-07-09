const db = require('../../data/db-config');


function getAll() {
    return db('movies');
}

function getById(id) {
    return db('movies').where({ movie_id: id }).first()
}

function getByFilter(movie_name){
    return db('movies').where({ movie_name: movie_name }).first()
}

async function insert(movie) {
    const [insertedId] = await db('movies').insert(movie);
    return getById(insertedId)
}

async function update(id,movie) {
    await db('movies').where({ movie_id: id }).update(movie)
    return getById(id)
}


function remove(id) {
    return db('movies').where({ movie_id: id }).del();
}

module.exports = { getAll, getById, getByFilter, insert, update, remove  }