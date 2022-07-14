import { format } from 'morgan';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'error-service' },

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File(
      {
        filename: 'v1/src/logs/error/error.log',
        level: 'error',
      },
      { timestamp: true }
    ),
  ],
});
export default logger;
