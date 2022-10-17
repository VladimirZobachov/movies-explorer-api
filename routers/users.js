const express = require('express');
const { getCurUser, updateUser } = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users/me', getCurUser);
userRouter.patch('/users/me', updateUser);

module.exports = userRouter;
