const { createLogger, transports, format } = require('winston');
const path = require('path');

// Set the log file path and format
const logFilePath = path.join(__dirname, '../logs/app.log'); // Adjust the path as needed

const logFormat = format.combine(
  format.timestamp(),
  format.json()
);

// Create the logger instance
const logger = createLogger({
  format: logFormat,
  transports: [
    new transports.File({ filename: logFilePath })
  ]
});

function logFunction(level, message) {
  logger.log(level, message);
}


module.exports = { logFunction };
