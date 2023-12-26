const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const { ValidationError, CastError } = mongoose.Error;

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.status(200).send(movies);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description, image, trailerLink, id, nameRU, nameEN,
    } = req.body;
    const imageUrl = image.url;
    const thumbnail = image.formats.thumbnail.url;
    const newMovie = await new Movie({
      country,
      director,
      duration,
      year,
      description,
      image: imageUrl,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId: id,
      nameRU,
      nameEN,
    });
    await newMovie.save();
    return res.status(201).send(newMovie);
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(new BadRequestError('Ошибка валидации полей'));
    }
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError('У вас недостаточно прав, чтобы удалить фильм');
    }
    await movie.deleteOne();
    return res.send({ message: 'Фильм удален' });
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
