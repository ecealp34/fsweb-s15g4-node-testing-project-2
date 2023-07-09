const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
})


test('sanity check', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('Movies', () => {
test('[1] gets movies', async () => {
    const res = await request(server).get('/api/movies');
    expect(res.body).toHaveLength(3)
})

test('[2] gets movies by id', async () => {
    const res = await request(server).get('/api/movies/1');
    expect(res.body).toHaveProperty('movie_name', 'Harry Potter ve Felsefe Taşı')
})

test('[3] gets movies by id', async () => {
    const res = await request(server).get('/api/movies/2');
    expect(res.body).toHaveProperty('movie_name', 'Yüzüklerin Efendisi: İki Kule')
})
test('[4] gets movies by id', async () => {
    const res = await request(server).get('/api/movies/3');
    expect(res.body).toHaveProperty('time', '152min')
})

test('[5] gets movies by id', async () => {
    const res = await request(server).get('/api/movies/4');
    expect(res.body).toHaveLength(0)
})

test('[6] inserted movie', async () => {
    const movie = { movie_id: '4', movie_name: 'movie1', time: '100min'}
    let res = await request(server).post('/api/movies').send(movie);
    expect(res.status).toBe(201)
})

test('[7] inserted movie', async () => {
    const movie = { movie_id: '4', movie_name: 'movie1', time: '100min'}
    await request(server).post('/api/movies').send(movie);
    const res = await request(server).get('/api/movies');
    expect(res.body).toHaveLength(4)
    
})

test('[8] updated movie', async () => {
    const res = await request(server).put('/api/movies/2').send({ movie_id: '2', movie_name: 'movie2', time: '100min'})
    expect(res.status).toBe(201)
    
})

test('[9] updated movie', async () => {
    const res = await request(server).put('/api/movies/4').send({ movie_id: '4', movie_name: 'movie2', time: '100min'})
    expect(res.status).not.toBe(201)
    
})

test('[10] deleted movie', async () => {
    await request(server).delete('/api/movies/1');
    const res = await db('movies').where('movie_id', 1).first()
    expect(res).not.toBeDefined()
})
})