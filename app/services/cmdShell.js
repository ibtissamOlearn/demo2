const { exec } = require('child_process');
const { promisify } = require('util');
const {logFunction} = require('./loger');

  const executeCommand = async function (command) {
    try {
      const { stdout } = await promisify(exec)(command);
      logFunction('info', 'Command\'s output:\n' + stdout);
      return { result: stdout }; // Return the output as an object
    } catch (error) {
      logFunction('error', 'Command\'s error:\n' + error);
      throw error;
    }
  };

module.exports = { executeCommand };
