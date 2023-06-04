const express = require('express');
const {logFunction} = require('./loger');
const port = 3000;
const { SerialPort } = require('serialport');

const serialPort = new SerialPort({
  path: 'COM1',
  baudRate: 9600
});

const startSerialCommunication = (req, res) => {
  serialPort.open((error) => {
    if (error) {
      logFunction('error', 'Erreur lors du démarrage de la communication série :' + error);
      res.status(500).send('Erreur lors du démarrage de la communication série');
    } else {
      logFunction('info', 'Communication série démarrée avec succès');
      res.status(200).send('Communication série démarrée avec succès');
    }
  });
};

const stopSerialCommunication = (req, res) => {
  serialPort.close((error) => {
    if (error) {
      logFunction('error', 'Erreur lors de l\'arrêt de la communication série :' + error);
      res.status(500).send('Erreur lors de l\'arrêt de la communication série');
    } else {
      logFunction('info', 'Communication série arrêtée avec succès');
      res.status(200).send('Communication série arrêtée avec succès');
    }
  });
};

const writeData = (req, res) => {
  const { data } = req.body;
  console.log('Données à envoyer :', data);

  serialPort.write(data, (error) => {
    if (error) {
      logFunction('error', 'Erreur lors de l\'écriture sur le port série :' + error);
      res.status(500).send('Erreur lors de l\'écriture sur le port série');
    } else {
      logFunction('info', 'Données envoyées avec succès sur le port série');
      res.status(200).send('Données envoyées avec succès sur le port série');
    }
  });
};

const getSerialPorts = (req, res) => {
  serialPort.list()
    .then((ports) => {
      if (ports.length > 0) {
        // Scenario 1: Ports connected
        res.status(200).json(ports);
        logFunction('info', 'Here is the list of connected serial ports: ' + JSON.stringify(ports));
      } else {
        // Scenario 2: No ports connected
        logFunction('info', 'No serial ports connected');
        res.status(200).json([]);
      }
    })
    .catch((error) => {
      // Scenario 3: Error occurred
      logFunction('error', 'Error retrieving the list of serial ports: ' + error);
      res.status(500).send('Error retrieving the list of serial ports');
    });
};

module.exports = {
  startSerialCommunication,
  stopSerialCommunication,
  writeData,
  getSerialPorts
};
