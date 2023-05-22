import {Injectable, VERSION} from '@angular/core';
import * as ftp from 'basic-ftp';
import * as  fs from 'fs';


@Injectable({
  providedIn: 'root'
})

export class FTPservice {
  name = 'Angular ' + VERSION.major;

  async connect() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: '127.0.0.1',
        user: 'user',
        password: 'user',
        secure: true,
      });
      console.log('conected');
      console.log(await client.list());
      await client.uploadFrom('test/', 'C:/Users/ZRGH5903.AD/Desktop/ftp/upload.jpg');
      await client.downloadTo('test/', 'C:/Users/ZRGH5903.AD/Desktop/ftp/upload.jpg');
    } catch (err) {
      console.log(err);
    }
    client.close();
  }


}
