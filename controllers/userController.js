// @ts-nocheck

import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import { USER_ROLES } from '../utils/constants.js';

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

  res.status(200).json({
    status: 'success',
    message: `New user ${req.body.username} created`
  });
});

const updateUser = catchAsync(async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.roles) {
    res.status(500).json({
      status: 'failed',
      message: `You should include value for username, password and roles`
    });
  }

  // TODO: How to run validators for updated password

  const requestBody = {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 12)
  };
  const user = await User.findByIdAndUpdate(req.params.id, requestBody, {
    runValidators: true
  });

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

const updateUserAttribute = catchAsync(async (req, res) => {
  if (!USER_ROLES[req.body.role]) {
    res.status(500).json({
      status: 'failed',
      message: `Role is not valid`
    });
  }
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

export { getUsers, createUser, updateUser, updateUserAttribute };
