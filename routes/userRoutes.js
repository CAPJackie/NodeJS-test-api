const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getUsers);

router
  .route('/:id')
  .post(userController.createUser)
  .put(userController.updateUser)
  .patch(userController.updateUserAttribute);

module.exports = router;
