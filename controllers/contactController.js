// @ts-nocheck
import httpStatus from 'http-status';
import Contact from '../models/contactModel.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

const getContacts = catchAsync(async (_, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    status: 'success',
    contacts
  });
});

const createContact = catchAsync(async (req, res) => {
  const user = await User.findById(req.id);

  const contact = new Contact(req.body);
  contact.author = user._id;

  contact.save();

  res.status(httpStatus.CREATED).json({
    status: 'success',
    message: `New contact ${req.body.email} created`
  });
});

const updateContact = catchAsync(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true
  });

  if (!contact) {
    res.status(500).json({
      status: 'failed',
      message: `Contact doesn't exist`
    });
  }

  res.status(200).json({
    status: 'success',
    message: `Contact ${contact.email} updated`
  });
});

const deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: `Contact ${contact.email} deleted`
  });
});

export { getContacts, createContact, updateContact, deleteContact };
