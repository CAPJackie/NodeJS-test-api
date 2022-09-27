import express from 'express';
import {
  createUser,
  getUsers,
  updateRole,
  updateUser
} from '../controllers/userController.js';

import { loginUser } from '../controllers/authController.js';
import protect from '../middlewares/protect.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router
  .route('/')
  .get(verifyToken, protect, getUsers)
  .post(createUser);

router
  .route('/:id')
  .put(verifyToken, updateUser)
  .patch(verifyToken, updateRole);

router.route('/authenticate').post(loginUser);

export default router;
