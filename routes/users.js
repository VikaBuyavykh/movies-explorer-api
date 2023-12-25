const { Router } = require("express");
const { getUser, updateUser, getUsers, createUser } = require("../controllers/users");

const userRouter = Router();

userRouter.get('/:userId', getUser);
userRouter.patch('/:userId', updateUser);
userRouter.get('/', getUsers);
userRouter.post('/', createUser);

module.exports = userRouter;