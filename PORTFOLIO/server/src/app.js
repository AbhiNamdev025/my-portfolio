const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const { clientUrls } = require('./config/env');

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
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all origins dynamically to prevent CORS blocks
      return callback(null, origin || '*');
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/api', limiter, apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
