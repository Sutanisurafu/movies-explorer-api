const Movie = require('../models/movie');
const { STATUS_CODES } = require('../constants/errors');
const NotFoundError = require('../errors/Not-found');
const BadRequestError = require('../errors/Bad-request');
const ForbiddenError = require('../errors/Forbidden-request');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user_id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

module.exports.postMovie = (req, res, next) => {
  console.log(req.body);

  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(STATUS_CODES.OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      } return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильма с таким id несуществует'))
    .then((data) => {
      if (data.owner._id === req.user._id) {
        return Movie.deleteOne(data)
          .then(res.send({ message: 'Фильм успешно удалён!' }));
      }
      return next(new ForbiddenError('Вы не можете удалить фильм другого пользователя'));
    })
    .catch((err) => {
      if (err.name === 'castError') {
        return next(new BadRequestError('Некорректный id'));
      } return next(err);
    });
};
