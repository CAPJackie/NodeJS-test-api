import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import protect from '../middlewares/protect.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router
  .route('/')
  .get(verifyToken, protect, getContacts)
  .post(verifyToken, createContact);

router
  .route('/:id')
  .put(verifyToken, updateContact)
  .delete(verifyToken, deleteContact);

export default router;
