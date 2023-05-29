import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(
  {providedIn: 'root'}
)
export class SerialPortService {

  private apiBaseUrl = 'http://localhost:3001';
  constructor(private http: HttpClient) {}


  startSerialCommunication() {
    return this.http.post<any>(`${this.apiBaseUrl}/start`, { });
  }

  stopSerialCommunication() {
    return this.http.post(`${this.apiBaseUrl}/stop`, {});
  }

  writeData(data: any){
    return this.http.post(`${this.apiBaseUrl}/write`, { data });
  }

  getSerialPorts() {
    return this.http.get(`${this.apiBaseUrl}/list`, {});
  }
}
