const express = require('express');
const { getCurUser, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../validator');

const userRouter = express.Router();

userRouter.get('/users/me', getCurUser);
userRouter.patch('/users/me', validateUpdateUser, updateUser);

module.exports = userRouter;
