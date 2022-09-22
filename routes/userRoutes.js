import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  updateUserAttribute
} from '../controllers/userController.js';

import { loginUser } from '../controllers/authController.js';
import verifyToken from '../middlewares/verifyToken.js';
import protect from '../middlewares/protect.js';

const router = express.Router();

router
  .route('/')
  .get(verifyToken, protect, getUsers)
  .post(createUser);

router
  .route('/:id')
  .put(verifyToken, updateUser)
  .patch(verifyToken, updateUserAttribute);

router.route('/authenticate').post(loginUser);

export default router;
