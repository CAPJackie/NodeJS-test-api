import catchAsync from '../utils/catchAsync.js';
import User from '../models/userModel.js';

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

const createUser = catchAsync(async (req, res) => {});

const updateUser = catchAsync(async (req, res) => {
  const user = User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

const updateUserAttribute = catchAsync(async (req, res) => {
  const user = User.findByIdAndUpdate(
    req.params.id,
    { ...req.body.roles, ...req.body.username },
    { runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

export { getUsers, createUser, updateUser, updateUserAttribute };
