import {app, BrowserWindow, screen, dialog, ipcMain} from 'electron';
import {autoUpdater} from "electron-updater";
import * as logger from "./services/logger";
import electronLog from 'electron-log';
import * as path from 'path';
import * as fs from 'fs';
////////////////////////////////////////////////////
const express = require('express');
const { logFunction } = require('./services/loger');
const app_express = express();
const backendApp = express();
backendApp.use(express.static(path.join(__dirname, 'backend')));
const server = backendApp.listen(3001, 'localhost', () => {
  logFunction('info','Express server started on port 3001 main side');
});
///////////////////////////////////////////////////

electronLog.transports.file.level = 'debug';
let win: BrowserWindow = null;
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'ibtissamOlearn',
  repo: 'demo2'
});
Object.defineProperty(app, 'isPackaged', {
  get() {
    return true;
  }
});

autoUpdater.autoDownload = false ;
autoUpdater.autoInstallOnAppQuit = true;

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,  // false if you want to run e2e test with Spectron
      preload: path.join(__dirname, 'preload.js')
    },
  });

  win.webContents.openDevTools();

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
    //logger.info("app started on port 4200");
    //logger.logFunction("info","app started on port 4200 logger");
    logFunction("info","app started on port 4200 log");

  } else {
    // Path when running electron executable
    //logger.info("app exe running1");
    //logger.logFunction("info","app exe running1");
    logFunction("info","app exe running1");
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      //logger.info("app exe running2");
      //logger.logFunction("info","app exe running2");
      logFunction("info","app exe running2");
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    //logger.info("app closed");
    //logger.logFunction("info","app closed");
    logFunction("info","app closed");
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {
        setTimeout(createWindow, 400),
          logFunction('info','looking for update'),
        autoUpdater.checkForUpdatesAndNotify()
    }
  );

  /*ipcMain.on('log-message', (event, message) => {
    //console.log(message); // This logs "This is a message from Angular",
    logger.info(message)
  });*/

  autoUpdater.on('update-available', function(info) {
    const updateMessage = `A new version (${info.version}) of the app is available. Do you want to download and install it now?`;
    logFunction('info','update-available');
    const buttons = ['Download', 'Later'];
    const options = { type: 'question', buttons: buttons, defaultId: 0, title: 'Update Available', message: updateMessage };

    dialog.showMessageBox(win, options).then(function({ response }) {
      if (response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });

  autoUpdater.on('update-downloaded', function(info) {
    const updateMessage = `A new version (${info.version}) of the app has been downloaded. Do you want to restart the app now to install the update?`;
    logFunction('info','update-not-available');
    const buttons = ['Restart', 'Later'];
    const options = { type: 'question', buttons: buttons, defaultId: 0, title: 'Update Downloaded', message: updateMessage };

    dialog.showMessageBox(win, options).then(function({ response }) {
      if (response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    server.close();
    logFunction('info','app closed');
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
      /*ipcMain.on('log-message', (event, message) => {
        console.log(message); // This logs "This is a message from Angular",
        console.log("hello test msg angular"),
          logger.info(message)
      });*/
    }
  });


} catch (e) {
  // Catch Error
  // throw e;
}
