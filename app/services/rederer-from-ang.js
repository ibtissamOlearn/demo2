const { ipcMain } = require('electron');

ipcMain.on('some-message', (event, arg) => {
  console.log(arg); // prints "hello from Angular"
  event.reply('some-reply', 'hello from Electron');
});
