const router = require('express').Router();
const movieModel = require('../movies/movies-model');

router.get('/', async(req,res,next) => {
    try {
        const movies = await movieModel.getAll()
        res.status(200).json(movies);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req,res,next) => {
    try {
        const id = req.params.id
        const movie = await movieModel.getById(id)
        res.status(200).json(movie);
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req,res,next) => {
    try {
        const model = { movie_id: req.body.movie_id, movie_name: req.body.movie_name, time: req.body.time}
        const inserted = await movieModel.insert(model)
        res.status(201).json(inserted);
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async(req,res,next) => {
    try {
        let { movie_id, movie_name, time } = req.body;
        const model = { movie_id: req.body.movie_id, movie_name: req.body.movie_name, time: req.body.time}
        const updatedMovie = await movieModel.update(req.params.id, model)
        res.status(201).json(updatedMovie);
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async(req,res,next) => {
    try {
        const movie = await movieModel.remove(req.params.id)
        res.status(201).json(movie);
    } catch (error) {
        next(error)
    }
})

module.exports = router;