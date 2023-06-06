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
import {LoggerService} from './apiServices/logger-servive';
import { SftpService } from './apiServices/sftp-service';
import {CmdShellService} from './apiServices/cmd-shell-service';
import {SerialPortService} from './apiServices/serial-port-service';
//import * as fs from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  globalLogs: any[] = [];
  output: string | null = null;
  files: string ;
  headers: any[] = ['date', 'level', 'message'];
  filePath: string;
  comPorts: any[];


  constructor(private router: Router, /*private sftpService: SFTPservice*/ private  serialPortService: SerialPortService,
              private electronService: ElectronService, private saverService: GlobalLogsService,
              private loggerService: LoggerService, private sftpService: SftpService, private cmdShellService: CmdShellService) {
  }

  ngOnInit() {
  }

  getCOMPorts() {
    this.serialPortService.listCOMPorts().subscribe(
      (ports: any[]) => {
        this.comPorts = ports;
        console.log( this.comPorts); // Do whatever you want with the COM ports data
        this.loggerService.log('info', 'list of Com Port : ' + JSON.stringify(this.comPorts));
      },
      error => {
        console.error('Failed to retrieve COM ports:', error);
        this.loggerService.log('error', error);
      }
    );
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

  executeShellCommand(command: string): void {
    this.cmdShellService.executeCommand(command)
      .then((response) => {
        //this.output =  JSON.stringify(response.result);
        //this.output = response.result.replace(/\\r\\n/g, '\n').replace(/�/g, '');
        this.output = response.result;
        //console.log('commande result:', JSON.stringify(this.output.replace(/\\r\\n/g, '\n').replace(/�/g, '')) );
        console.log('commande result:', JSON.stringify(this.output));
      })
      .catch((error) => {
        console.error('erreur =', error.message);
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

  downloadFile() {
    if(this.filePath){
      this.sftpService.downloadFile(this.filePath).subscribe(
        (response) => {
          console.log('File downloaded successfully' + response);
          // Handle successful file download
        },
        (error) => {
          console.error('Error downloading file', error);
          // Handle error downloading file
        }
      );
    }
  }


  startCommunication() {
    this.serialPortService.startSerialCommunication().subscribe(
      () => {
        console.log('communication started');
        this.loggerService.log('info','Communication started successfully');
      },
      (error) => {
        console.error(error);
        this.loggerService.log('Communication error', error);
      }
    );
  }

  stopCommunication() {
    this.serialPortService.stopSerialCommunication().subscribe(
      () => {
        console.log('communication stopped');
        this.loggerService.log('info','Communication stopped successfully');
      },
      (error) => {
        console.error(error);
        this.loggerService.log('Failed to stop communication:', error);
      }
    );
  }

  sendData() {
    const data = 'Your data here';
    this.serialPortService.writeData(data).subscribe(
      () => {
        console.log('data sent');
        this.loggerService.log('info','Data sent successfully');
      },
      (error) => {
        console.log(error);
        this.loggerService.log('error','Failed to send data:'+ error);
      }
    );
  }

  getPorts() {
    console.log('getPorts');
    this.serialPortService.getSerialPorts().subscribe(
      (ports) => {
        console.log(ports);
        this.loggerService.log('info','Serial ports list:'+ JSON.stringify(ports));
      },
      (error) => {
        console.log(error);
        this.loggerService.log('error','Failed to get serial ports:'+ error);
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

}
