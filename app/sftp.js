// sftp.js

const Client = require('ssh2-sftp-client');
const { logFunction } = require('./loger');

const connectToSftpServer = async () => {
  const sftp = new Client();
  try {
    await sftp.connect({
      host: "10.57.135.188",
      username: "airmessir",
      password: ")6kUJ9WmEIyT"
    });
    //console.log('Connected to SFTP server');
    logFunction('info','Connected to SFTP server from apiservice' )
    return sftp;
  } catch (err) {
    //console.error('Error connecting to SFTP server:', err.message);
    logFunction('error','Error connecting to SFTP server from apiservice:', err.message)

    throw err;
  }
};

const connectAndList = async (directory) => {
  const sftp = new Client();
  try {
    await sftp.connect({
      host: "10.57.135.188",
      username: "airmessir",
      password: ")6kUJ9WmEIyT"
    });
    logFunction('info', 'Connected to SFTP server from apiservice');

    const files = await sftp.list(directory);
    console.log('Files:', files);

    return files;
  } catch (err) {
    console.error('Error connecting to or listing files from SFTP server:', err.message);
    logFunction('error', 'Error connecting to or listing files from SFTP server:', err.message);

    throw err;
  } finally {
    sftp.end(); // Close the SFTP connection
  }
};

const listFiles = async (sftp, directory) => {
  try {
    const sftp = new Client();
    await sftp.connect({
      host: "10.57.135.188",
      username: "airmessir",
      password: ")6kUJ9WmEIyT"
    });
    const files = await sftp.list(directory);
    console.log('Files:', files);
    return files;
  } catch (err) {
    console.error('Error listing files:', err.message);
    throw err;
  }
};

const uploadFileToSftpServer = async (sftp, localPath, remotePath) => {
  try {
    await sftp.put(localPath, remotePath);
    console.log('File uploaded successfully');
  } catch (err) {
    console.error('Error uploading file:', err.message);
    throw err;
  }
};

const downloadFileFromSftpServer = async (sftp, remotePath, localPath) => {
  try {
    await sftp.get(remotePath, localPath);
    console.log('File downloaded successfully');
  } catch (err) {
    console.error('Error downloading file:', err.message);
    throw err;
  }
};

module.exports = { connectToSftpServer, listFiles, uploadFileToSftpServer, downloadFileFromSftpServer };
