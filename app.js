// @ts-nocheck
import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import httpStatus from 'http-status';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import contactsRoutes from './routes/contactRoutes.js';
import ApiError from './utils/ApiError.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import verifyToken from './middlewares/verifyToken.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/campaigns', verifyToken, campaignRoutes);
app.use('/api/v1/contacts', verifyToken, contactsRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
