const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../config');
const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new UnauthorizedError('С токеном что-то не так'));
    }
    return next(error);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
