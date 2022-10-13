const Movie = require('../models/Movie');
const {NotFoundError} = require("../errorsClasses/NotFoundError");

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
        nameEN
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
            nameEN
        });
        if (!movie) {
            return new Error('некорректные данные');
        } else {
            res.send(movie);
        }
    }catch (e){
        next(e);
    }
    console.log(movieId);
}


const getMovies = async (req, res, next) => {
    try{
        const movies = await Movie.find({});
        if (!movies) {
            return  new NotFoundError('Никаких фильмов не нашлось');
        } else {
            return res.send(movies);
        }
    }catch (e){
        next(e);
    }
}

module.exports = {
    createMovie,
    getMovies
}