const { celebrate, Joi } = require('celebrate');
const { videoUrlRegex, imageUrlRegex } = require('./regex');

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().keys({
      url: Joi.string().required().pattern(imageUrlRegex),
      formats: Joi.object().keys({
        thumbnail: Joi.object().keys({
          url: Joi.string().required().pattern(imageUrlRegex),
        }).unknown(true),
      }).unknown(true),
    }).unknown(true),
    trailerLink: Joi.string().required().pattern(videoUrlRegex),
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }).unknown(true),
});

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  movieIdValidation,
  createMovieValidation,
  signInValidation,
  signUpValidation,
  updateUserValidation,
};
