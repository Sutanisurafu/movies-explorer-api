const router = require('express').Router();
const NotFoundError = require('../errors/Not-found');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', auth, (res, req, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
