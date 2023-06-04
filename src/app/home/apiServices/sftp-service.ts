// SftpService.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SftpService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  connectToSftpServer() {
    return this.http.get(`${this.baseUrl}/connect`, { responseType: 'text' });
  }

  listFiles() {
    return this.http.get(`${this.baseUrl}/list`, { responseType: 'text' });
  }
  connectlist() {
    return this.http.get(`${this.baseUrl}/connectlist`, { responseType: 'text' });
  }

  uploadFileToSftpServer() {
    return this.http.get(`${this.baseUrl}/upload`);
  }

  downloadFileFromSftpServer(filePath: string) {
    return this.http.get(`${this.baseUrl}/download?filePath=${encodeURIComponent(filePath)}`);
  }

  downloadFile(filePath: string) {
    return this.http.get(`${this.baseUrl}/downloadfile}`, {params:{filePath}});
  }

}
