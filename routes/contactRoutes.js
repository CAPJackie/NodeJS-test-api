const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router
  .route('/')
  .get(contactController.getContacts)
  .post(contactController.createContact)
  //TODO Ask Sebas, duplicated
  .put(contactController.updateContact);

router
  .route('/:id')
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
