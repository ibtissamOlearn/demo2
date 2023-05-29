import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = 'http://localhost:3001';
  constructor(private http: HttpClient) {}

  executeCommand(command: string): Promise<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/execute-command`, { command }).toPromise();
  }
}
