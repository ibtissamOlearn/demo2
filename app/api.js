const express = require('express');
const { logFunction } = require('./services/loger');
const sftp = require('./services/sftp');
const {executeCommand} = require("./node_modules/cmdShell");
const app = express();
const cors = require('cors');
const {SerialPort} = require('serialport');

const serialPort = require('./services/serialPort');

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());


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

app.post('/execute-command', async (req, res) => {
  const { command } = req.body;
  try {
    const result = await executeCommand(command);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/com-ports', (req, res) => {
  SerialPort.list()
    .then(ports => {
      res.json(ports);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve COM ports' });
    });
});


app.post('/startport', serialPort.startSerialCommunication);
app.post('/stopport', serialPort.stopSerialCommunication);
app.post('/writeport', serialPort.writeData);
app.get('/listport', serialPort.getSerialPorts);

app.get('/downloadfile', async (req, res) => {
  try {
    const sftpConnection = await sftp.connectToSftpServer();
    await sftp.downloadFile(sftpConnection, req.query.filePath, 'C:\\Users\\ZRGH5903.AD\\Downloads');
    res.send('File downloaded successfully');
  } catch (err) {
    console.error('Error downloading file', err);
    res.status(500).send('Error downloading file: ' + err.message);
  }
});

// Start the Express.js server
app.listen(3001, () => {
  logFunction('info','Express server started on port 3001 from the api side');
});






