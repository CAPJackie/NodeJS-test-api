// @ts-nocheck
import httpStatus from 'http-status';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { USER_ROLES } from '../utils/constants.js';

const protect = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) {
    return next(
      new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `User doesn't exist`)
    );
  }

  if (!user.roles.includes(USER_ROLES.ADMIN)) {
    return next(
      new ApiError(
        httpStatus.FORBIDDEN,
        'User is not allowed to perform this operation'
      )
    );
  }
  next();
});

export default protect;
