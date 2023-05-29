const { exec } = require('child_process');
const { promisify } = require('util');
const { logFunction } = require('./loger');

const executeCommand = async function (command) {
  try {
    const { stdout } = await promisify(exec)(command);
    logFunction('info', 'Command\'s output api:\n' + stdout);
    return { result: JSON.stringify(stdout) };
  } catch (error) {
    logFunction('error', 'Command\'s error api:\n' + error);
    throw error;
  }
};

module.exports = { executeCommand };

