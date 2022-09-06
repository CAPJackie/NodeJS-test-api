import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  updateUserAttribute
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers);

router
  .route('/:id')
  .post(createUser)
  .put(updateUser)
  .patch(updateUserAttribute);

export default router;
