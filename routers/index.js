const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../midlewares/auth');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../errorsClasses/NotFoundError');
const { validateUserBody, validateLogin } = require('../validator');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);
router.use(userRouter);
router.use(moviesRouter);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
