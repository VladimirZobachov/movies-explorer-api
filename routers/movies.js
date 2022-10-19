const express = require('express');

const moviesRouter = express.Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateMovieBody, validateMovieId } = require('../validator');

moviesRouter.post('/movies', validateMovieBody, createMovie);
moviesRouter.get('/movies', getMovies);
moviesRouter.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = moviesRouter;
