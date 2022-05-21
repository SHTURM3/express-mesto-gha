const router = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  changeProfile,
  changeAvatar,
} = require('../controlers/users');

router.patch('/me/avatar', changeAvatar);

router.patch('/me', changeProfile);

router.get('/:id', getUser);

router.post('', createUser);

router.get('', getUsers);

module.exports.userRouter = router;
