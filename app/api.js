const express = require('express');
const { logFunction } = require('./loger');
const sftp = require('./sftp');
const app = express();

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

// Logger API route
app.post('/api/logger', (req, res) => {
  const { level, message } = req.body;
  logFunction(level, message); // Call the logFunction with the message
  res.status(200).json({ success: true }); // Send a JSON response
});


app.get('/connect', async (req, res) => {
  try {
    const sftpConnection = await sftp.connectToSftpServer();
    //res.send('Connected to SFTP server');
    res.json({ message: "connected to SFTP server" });

  } catch (err) {
    res.status(500).send('Error connecting to SFTP server');
  }
});

app.get('/connectlist', async (req, res) => {
  try {
    const files = await sftp.connectAndList('/');
    res.json(files);
  } catch (err) {
    res.status(500).send('Error connecting to or listing files from SFTP server');
  }
});

app.get('/list', async (req, res) => {
  try {
    const sftpConnection = await sftp.connectToSftpServer();
    const directoryPath = '/';
    const files = await sftp.listFiles(sftpConnection, directoryPath);
    res.send(files);
  } catch (err) {
    console.error('Error listing files from api:', err);
    logFunction('error', err);
    res.status(500).send('Error listing files');
  }
});

app.get('/upload', async (req, res) => {
  try {
    const sftpConnection = await sftp.connectToSftpServer();
    await sftp.uploadFileToSftpServer(sftpConnection, '/path/to/local/file', '/path/to/remote/file');
    res.send('File uploaded successfully');
  } catch (err) {
    res.status(500).send('Error uploading file');
  }
});

app.get('/download', async (req, res) => {
  try {
    const sftpConnection = await sftp.connectToSftpServer();
    await sftp.downloadFileFromSftpServer(sftpConnection, '/path/to/remote/file', '/path/to/local/file');
    res.send('File downloaded successfully');
  } catch (err) {
    res.status(500).send('Error downloading file');
  }
});


// Start the Express.js server
app.listen(3001, () => {
  logFunction('info','Express server started on port 3001 from the api side');
});






