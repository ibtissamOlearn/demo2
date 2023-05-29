import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private apiURL = 'http://localhost:3001/api/logger'; // Replace with your Express.js API URL

  constructor(private http: HttpClient) { }

  log(level: string, message: string) {
    const payload = { level, message };
    return this.http.post(this.apiURL, payload, { responseType: 'text' }).toPromise();
  }

}
