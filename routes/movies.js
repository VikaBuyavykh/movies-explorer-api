const { Router } = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieIdValidation, createMovieValidation } = require('../utils/reqValidation');

const movieRouter = Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidation, createMovie);
movieRouter.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = movieRouter;
