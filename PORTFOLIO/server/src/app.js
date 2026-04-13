const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const { clientUrl } = require('./config/env');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

app.use(helmet());
app.use(cors({ origin: clientUrl }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/api', limiter, apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
