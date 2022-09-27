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
  contact.author = user;

  contact.save();

  res.status(httpStatus.CREATED).json({
    status: 'success',
    message: `New contact ${req.body.email} created`
  });
});

const updateContact = catchAsync(async (req, res) => {
  if (!req.body.email || !req.body.isLead) {
    res.status(500).json({
      status: 'failed',
      message: `You should include value for email and isLead`
    });
  }
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
    data: { contact }
  });
});

const deleteContact = catchAsync(async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export { getContacts, createContact, updateContact, deleteContact };
