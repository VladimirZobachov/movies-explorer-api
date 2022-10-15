const express = require('express');
const moviesRouter = express.Router();

const {createMovie, getMovies, deleteMovie} = require("../controllers/movies");

moviesRouter.post('/movies', createMovie);
moviesRouter.get('/movies', getMovies);
moviesRouter.delete('/movies/:movieId', deleteMovie);

module.exports = moviesRouter;