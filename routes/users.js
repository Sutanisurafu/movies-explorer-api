const userRouter = require('express').Router();
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');
const {
  userEditValidation,
} = require('../middlewares/validators');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', userEditValidation, updateUser);

module.exports = userRouter;
