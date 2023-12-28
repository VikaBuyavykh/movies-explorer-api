const { Router } = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../utils/reqValidation');

const userRouter = Router();

userRouter.get('/me', getUser);
userRouter.patch('/me', updateUserValidation, updateUser);

module.exports = userRouter;
