const Movie = require('../models/Movie');
const { NotFoundError } = require('../errorsClasses/NotFoundError');
const { ForbiddenError } = require('../errorsClasses/ForbiddenError');

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
    if (!movie) {
      return new Error('некорректные данные');
    }
    return res.send(movie);
  } catch (e) {
    return next(e);
  }
};

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    if (!movies) {
      return new NotFoundError('Никаких фильмов не нашлось');
    }
    return res.send(movies);
  } catch (e) {
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    if (movie.owner.toString() === req.user._id) {
      await movie.remove();
      return res.send({ message: 'Фильм удален' });
    }
    return next(new ForbiddenError('Это не ваш фильм'));
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
