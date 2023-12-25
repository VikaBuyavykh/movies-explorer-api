const mongoose = require('mongoose');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const { ValidationError, CastError } = mongoose.Error;

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await new User({
      email, password, name,
    });
    await newUser.save();
    return res.status(201).send({
      email: newUser.email,
      name: newUser.name
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictError('Такой пользователь уже существует'));
    } if (error instanceof ValidationError) {
      return next(new BadRequestError('Ошибка валидации полей'));
    }
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Такого пользователя не существует');
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { email: req.body.email, name: req.body.name }, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Такого пользователя не существует');
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  }
};

module.exports = {
  getUser, updateUser, getUsers, createUser
};
