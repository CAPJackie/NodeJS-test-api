// @ts-nocheck
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const verifyToken = catchAsync(async (req, _, next) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader || !bearerHeader.startsWith('Bearer')) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Token is not valid'));
  }
  const bearerToken = bearerHeader.split(' ')[1];
  const decoded = await promisify(jwt.verify)(
    bearerToken,
    process.env.JWT_SECRET
  );

  req.id = decoded.id;
  next();
});

export default verifyToken;
