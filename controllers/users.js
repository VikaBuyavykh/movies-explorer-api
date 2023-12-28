const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  NODE_ENV, JWT_SECRET, SALT_ROUNDS, MONGO_DUPLICATE_ERROR_CODE,
} = require('../config');

const { ValidationError, CastError } = mongoose.Error;

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await new User({
      email, password: hash, name,
    });
    await newUser.save();
    return res.status(201).send({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError('Такой пользователь уже существует'));
    } if (error instanceof ValidationError) {
      return next(new BadRequestError('Ошибка валидации полей'));
    }
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Такого пользователя не существует');
    } else {
      const { email, name } = user;
      return res.status(200).send({ email, name });
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
    const user = await User.findByIdAndUpdate(req.user._id, {
      email: req.body.email, name: req.body.name,
    }, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Такого пользователя не существует');
    } else {
      const { email, name } = user;
      return res.status(200).send({ email, name });
    }
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    if (error instanceof CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password').orFail(() => {
      throw new UnauthorizedError('Неправильные email или пароль');
    });
    const matched = await bcrypt.compare(String(password), user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные email или пароль');
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
    return res.send({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUser, updateUser, createUser, login,
};
