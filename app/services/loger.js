const log = require('electron-log');
const path = require('path');

// Set the log file path
log.transports.file.resolvePath = () => path.join(__dirname, './logs/app.log');

function logFunction(level, message) {
  switch (level) {
    case 'error':
      log.error(message);
      break;
    case 'warn':
      log.warn(message);
      break;
    default:
      log.info(message);
      break;
  }
}

module.exports = { logFunction };
