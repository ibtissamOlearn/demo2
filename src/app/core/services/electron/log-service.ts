import { Injectable } from '@angular/core';
import {createLogger, transports, format} from 'winston';

const logFormat = format.combine(
  format.timestamp(),
  format.json()
);

// Create the logger instance
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({ filename: 'logs/app.log' })
  ]
});
@Injectable()
export class LogService {
  constructor() { }

  logOnContinue(): void {
    logger.info('navigate from landing page to list');
  }
}
