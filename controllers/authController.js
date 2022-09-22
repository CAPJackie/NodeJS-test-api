// @ts-nocheck
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}m`
  });
};

const loginUser = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ApiError(400, 'Please provide username and password!'));
  }

  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new ApiError(401, 'Invalid Credentials'));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    jwt: token,
    expiration_date: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 60 * 1000
    )
  });
});

// eslint-disable-next-line import/prefer-default-export
export { loginUser };
