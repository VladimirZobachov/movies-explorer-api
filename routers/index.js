const express = require('express');

const router = express.Router();
const auth = require('../midlewares/auth');
const {
  createUser, login, getCurUser, updateUser,
} = require('../controllers/users');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);
router.get('/users/me', getCurUser);
router.patch('/users/me', updateUser);
router.post('/movies', createMovie);
router.get('/movies', getMovies);
router.delete('/movies/:movieId', deleteMovie);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

module.exports = router;
