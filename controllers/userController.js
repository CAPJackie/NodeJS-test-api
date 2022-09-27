// @ts-nocheck

import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

const getUsers = catchAsync(async (_, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    users
  });
});

const createUser = catchAsync(async (req, res) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
    roles: req.body.roles
  });

  res.status(201).json({
    status: 'success',
    message: `New user ${req.body.username} created`
  });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.username = req.body.username;
  user.password = req.body.password;
  user.roles = req.body.roles;

  user.save();

  if (!user) {
    res.status(500).json({
      status: 'failed',
      message: `User doesn't exist`
    });
  }

  res.status(200).json({
    status: 'success',
    message: `${req.body.username} updated`
  });
});

const updateRole = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { roles: [req.body.role] },
    { runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    message: `Role of ${user.username} updated`
  });
});

export { getUsers, createUser, updateUser, updateRole };
