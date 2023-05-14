import { createLogger, transports, format, Logger } from "winston";

let logger: Logger;

logger = createLogger({
  level: 'info',
  format:  format.combine(
    format.json(),
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  defaultMeta: {service: 'user-service'},
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({dirname: 'logs', filename: 'error.log', level: 'error'}),
    new transports.File({dirname: 'logs', filename: 'combined.log'}),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}
