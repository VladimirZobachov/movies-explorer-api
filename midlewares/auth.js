const jwt = require('jsonwebtoken');
const { NotAuthError } = require('../errorsClasses/NotAuthError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET');
  } catch (err) {
    next(new NotAuthError('Вы не авторизованы!'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
