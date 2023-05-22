import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor() { }

  sendMessage() {
    ipcRenderer.send('some-message', 'hello from Angular');
    ipcRenderer.once('some-reply', (event, arg) => {
      console.log(arg); // prints "hello from Electron"
    });
  }
}
