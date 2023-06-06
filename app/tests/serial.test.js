const { startSerialCommunication, stopSerialCommunication, writeData, getSerialPorts } = require('../services/serialPort');
const { logFunction } = require('../services/loger');
const { SerialPort } = require('serialport');

jest.mock('../services/loger', () => ({
  logFunction: jest.fn()
}));

jest.mock('serialport', () => ({
  SerialPort: jest.fn().mockImplementation(() => ({
    open: jest.fn(),
    close: jest.fn(),
    write: jest.fn(),
    list: jest.fn()
  }))
}));


describe('startSerialCommunication', () => {
  test('should start serial communication successfully', () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    const openCallback = jest.fn(); // Mock the callback passed to serialPort.open()

    const mockSerialPortInstance = {
      open: jest.fn().mockImplementation((callback) => {
        openCallback.mockImplementationOnce(callback);
      })
    };

    SerialPort.mockImplementation(() => mockSerialPortInstance);

    startSerialCommunication(req, res);

    // Simulate successful serialPort.open() call
    openCallback(null); // Passing null as error parameter

    expect(logFunction).toHaveBeenCalledWith('info', 'Communication série démarrée avec succès');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Communication série démarrée avec succès');
    expect(mockSerialPortInstance.open).toHaveBeenCalledTimes(1);
  });

  // Add more test cases for different scenarios, such as error during serialPort.open()
});

