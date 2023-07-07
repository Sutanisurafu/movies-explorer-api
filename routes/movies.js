const movieRouter = require('express').Router();
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  movieValidation,
  movieIdValidation,
} = require('../middlewares/validators');

movieRouter.get('/', getMovies);
movieRouter.post('/', movieValidation, postMovie);
movieRouter.delete('/', movieIdValidation, deleteMovie);

module.exports = movieRouter;
