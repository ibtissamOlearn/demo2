import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Client, SFTPWrapper } from 'ssh2';
import { ElectronLog } from 'electron-log';
import {LogService} from '../core/services/electron/log-service';
import {SFTPservice} from '../core/services/electron/SFTPservice';
//import {ElectronService} from '../core/services/electron/electron.service';
import {level} from 'winston';
import {GlobalLogsService} from './globalLogs.service';
import { ElectronService } from 'ngx-electron';
import {LoggerService} from './logger-servive';
import { SftpService } from './sftp-service';
//import * as fs from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  globalLogs: any[] = [];
  files: string ;
  headers: any[] = ['date', 'level', 'message'];

  constructor(private router: Router, /*private sftpService: SFTPservice*/
              private electronService: ElectronService, private saverService: GlobalLogsService,
              private loggerService: LoggerService, private sftpService: SftpService) {
  }

  logMessagee() {
    const message = 'Hello, logging from Angular!';
    console.log(message);
    this.loggerService.log('info', message)
      .then(() => {
        console.log('Message logged successfully');
        this.loggerService.log('info', 'Message logged successfully');
      })
      .catch(error => {
        console.error('Error logging message:', error);
        this.loggerService.log('error', error);
      });
  }



  connectToSftpServer() {
    this.sftpService.connectToSftpServer().subscribe(
      (response) => {
        console.log(response);
        this.loggerService.log('info', 'connected to ftp server from frontend');
      },
      (error) => {
        console.error(error);
        this.loggerService.log('error', error);
      }
    );
  }

  listFiles() {
    this.sftpService.listFiles().subscribe(
      (files) => {
        console.log(files);
        this.loggerService.log('info', files.toString());
      },
      (error) => {
        console.error(error);
        this.loggerService.log('error', error);
      }
    );
  }

  uploadFileToSftpServer() {
    this.sftpService.uploadFileToSftpServer().subscribe(
      (response) => {
        console.log(response);
        // Handle successful file upload
      },
      (error) => {
        console.error(error);
        // Handle error uploading file
      }
    );
  }

  downloadFileFromSftpServer() {
    this.sftpService.downloadFileFromSftpServer().subscribe(
      (response) => {
        console.log(response);
        // Handle successful file download
      },
      (error) => {
        console.error(error);
        // Handle error downloading file
      }
    );
  }


  ngOnInit(): void {
  }

  generateLog() {
    this.saverService.addLog(new Date().toString(), 'info', 'add log message2');
  }

  downloadLogs() {
    this.saverService.downloadLogs();
  }


 /* logMessage() {
    console.log('this is a button from angular');
    if (this.electronService.isElectron) {
      const { ipcRenderer } = this.electronService;
      if (ipcRenderer) {
        ipcRenderer.send('logmessage', 'this is a button from angular 2');
      } else {
        console.error('ipcRenderer object is undefined');
      }
    } else {
      console.warn('Not running in electron!');
    }
  }

  logMessage() {
    console.log('This is a log message from Angular.');

    if (this.electronService.isElectronApp) {
    console.log('inside isElectron');
      this.electronService.ipcRenderer.send(
        'log-message',
        'This is a log message from Angular to test.'
      );
    }else {
      console.log('cannot send log msg from angular to electron app');
    }
  }*/

  public logMessage(): void {
    const message  = 'This is a log message from Angular.';
    console.log(message);

    if (this.electronService.isElectronApp) {
      console.log('inside isElectron');
      this.electronService.ipcRenderer.sendSync('log-message', message);
      const logMessage = new Date().toISOString() + ': ' + message + '\n';
      console.log(logMessage);
    }else {
      console.log('cannot send log msg from angular to electron app');
    }
  }

}
