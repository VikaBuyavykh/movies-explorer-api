const { Router } = require('express');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { signInValidation, signUpValidation } = require('../utils/reqValidation');

const router = Router();

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.use('*', auth, () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
