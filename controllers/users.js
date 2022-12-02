const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { NotFoundError } = require('../errorsClasses/NotFoundError');
const { ValidationError } = require('../errorsClasses/ValidationError');
const { DuplicateError } = require('../errorsClasses/DuplicateError');
const { NotAuthError } = require('../errorsClasses/NotAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    return res.status(200).send(user);
  } catch (e) {
    if (e.code === 11000) {
      return next(new DuplicateError('Такой email уже есть'));
    }
    return next(e);
  }
};

const getCurUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return new NotFoundError('Ничего не найдено');
    }
    return res.send(user);
  } catch (e) {
    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { email, name }, { new: true });
    if (!user) {
      return new NotFoundError('Ничего не найдено');
    }
    return res.send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new ValidationError('Некорректные дянные при обновлении пользователя'));
    }
    if (e.code === 11000) {
      return next(new DuplicateError('Это не ваш email'));
    }
    return next(e);
  }
};

const login = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  try {
    const user = await User.findOne({ email }).select(password);
    if (!user) {
      return next(new NotAuthError('Авторизация не успешна'));
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'SECRET',
    );
    return res.send({token});
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createUser,
  getCurUser,
  updateUser,
  login,
};
