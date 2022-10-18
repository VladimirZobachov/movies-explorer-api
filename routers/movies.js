const express = require('express');

const moviesRouter = express.Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateCardBody, validateCardId } = require('../validator');

moviesRouter.post('/movies', validateCardBody, createMovie);
moviesRouter.get('/movies', getMovies);
moviesRouter.delete('/movies/:movieId', validateCardId, deleteMovie);

module.exports = moviesRouter;
