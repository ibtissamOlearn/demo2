const { logFunction } = require('../services/loger');
const log = require('electron-log');

// Mock the log functions
jest.mock('electron-log', () => ({
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn()
}));

describe('logFunction', () => {
  test('should log an error message', () => {
    const errorMessage = 'This is an error message';

    logFunction('error', errorMessage);

    expect(log.error).toHaveBeenCalledWith(errorMessage);
  });

  test('should log a warning message', () => {
    const warningMessage = 'This is a warning message';

    logFunction('warn', warningMessage);

    expect(log.warn).toHaveBeenCalledWith(warningMessage);
  });

  test('should log an info message', () => {
    const infoMessage = 'This is an info message';

    logFunction('info', infoMessage);

    expect(log.info).toHaveBeenCalledWith(infoMessage);
  });
});
