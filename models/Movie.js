const mongoose = require('mongoose');
const { validateLink } = require('../validator');

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'поле country является обязательным для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'поле director является обязательным для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'поле duration является обязательным для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'поле year является обязательным для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'поле description является обязательным для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'поле image является обязательным для заполнения'],
    validate: [validateLink, 'некорректная ссылка'],
  },
  trailerLink: {
    type: String,
    required: [true, 'поле trailerLink является обязательным для заполнения'],
    validate: [validateLink, 'некорректная ссылка'],
  },
  thumbnail: {
    type: String,
    required: [true, 'поле thumbnail является обязательным для заполнения'],
    validate: [validateLink, 'некорректная ссылка'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieShema);
