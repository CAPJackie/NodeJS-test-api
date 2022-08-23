const express = require('express');
const userRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const contactsRoutes = require('./routes/contactRoutes');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/campaigns', campaignRoutes);
app.use('/api/v1/contacts', contactsRoutes);

app.all('*', (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
