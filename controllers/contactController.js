import Contact from '../models/contactModel.js';
import catchAsync from '../utils/catchAsync.js';

const getContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find();

  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: { contacts }
  });
});

const createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { contact: newContact }
  });
});

const updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true
  });

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
