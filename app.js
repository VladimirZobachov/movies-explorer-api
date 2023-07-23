require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const router = require('./routers');
const limiter = require('./midlewares/limiter');
const { errorHandler } = require('./midlewares/errorHandler');
const cors = require('cors');

const { NODE_ENV, ADDRESS_DB } = process.env;

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(NODE_ENV !== 'production' ? 'mongodb://localhost:27017/moviesdb' : ADDRESS_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(cors({
  origin: 'http://127.0.0.1:5173'
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
