import { Injectable } from '@angular/core';
import {ApiService} from './api-service';

@Injectable({
  providedIn: 'root'
})
export class CmdShellService {
  constructor(private apiService: ApiService) {}

  executeCommand(command: string): Promise<any> {
    return this.apiService.executeCommand(command);
  }

}
