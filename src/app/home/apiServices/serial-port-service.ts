import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class SerialPortService {

  private apiBaseUrl = 'http://localhost:3001';
  constructor(private http: HttpClient) {}


  startSerialCommunication() {
    return this.http.post<any>(`${this.apiBaseUrl}/startport`, { });
  }

  stopSerialCommunication() {
    return this.http.post(`${this.apiBaseUrl}/stopport`, {});
  }

  writeData(data: any){
    return this.http.post(`${this.apiBaseUrl}/writeport`, { data });
  }

  getSerialPorts() {
    return this.http.get(`${this.apiBaseUrl}/listport`, {});
  }

  listCOMPorts(): Observable<any> {
    const url = `${this.apiBaseUrl}/com-ports`;
    return this.http.get<any>(url);
  }
}
