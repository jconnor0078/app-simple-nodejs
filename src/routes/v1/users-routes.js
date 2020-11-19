const express = require('express');
const userController = require('../../controllers/v1/users-controller');
const {
  isValidHost,
  isAuth,
  isTheSameUserOrRolAdmin,
  isAdmin,
} = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', userController.login);
router.post('/create', userController.createUser);
router.post(
  '/update',
  isValidHost,
  isAuth,
  isTheSameUserOrRolAdmin,
  userController.updateUser
);
router.post('/delete', isValidHost, isAuth, isAdmin, userController.deleteUser);
router.get('/get-all', isValidHost, isAuth, userController.getUsers);

module.exports = router;
