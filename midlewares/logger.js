const winston = require('winston');
const expressWinston = require('express-winston');

const errorLogger = expressWinston.logger({
  transports: [new winston.transports.File({
    filename: 'errors.log',
  })],
  format: winston.format.json(),
});

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({
    filename: 'request.log',
  })],
  format: winston.format.json(),
});

module.exports = {
  errorLogger,
  requestLogger,
};
