const express = require("express");
const server = express();
const movieRouter = require('../api/movies/movies-router');

server.use(express.json());

server.get("/", (req,res) => {
    res.send("<h3> App is working </h3>")
})

server.use('/api/movies', movieRouter)

module.exports = server;