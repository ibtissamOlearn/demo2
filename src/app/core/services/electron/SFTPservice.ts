import { Client, SFTPWrapper } from 'ssh2';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SFTPservice {
  private connSettings: Client.ConnectConfig= {
    host: '10.57.135.188',
    username: 'airmessir',
    password: ')6kUJ9WmEIyT',
    port: '22'
  };
  private client: Client;
   private list$ !: Observable<string[]>;

  constructor(connSettings: Client.ConnectConfig) {
    this.connSettings = connSettings;
    this.client = new Client();
  }

  listFiles = (remotePathToList: string): void => {
    this.client.on('ready', () => {
      this.client.sftp((err: Error | undefined, sftp: SFTPWrapper) => {
        if (err) {throw err;}

        // eslint-disable-next-line @typescript-eslint/no-shadow
        sftp.readdir(remotePathToList, (err: Error | undefined, list: Array<SFTPWrapper>) => {
          if (err) {throw err;}
          console.dir(list);
          this.client.end();
        });
      });
    });

    this.client.connect(this.connSettings);
  };
}

