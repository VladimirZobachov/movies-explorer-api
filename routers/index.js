const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../midlewares/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);
router.use(userRouter);
router.use(moviesRouter);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

module.exports = router;
