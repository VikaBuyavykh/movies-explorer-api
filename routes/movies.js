const { Router } = require("express");
const { getMovies, createMovie, deleteMovie } = require("../controllers/movies");

const movieRouter = Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;