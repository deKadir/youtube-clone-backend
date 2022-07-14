import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'request-service' },

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File(
      {
        filename: 'v1/src/logs/request/info.log',
        level: 'info',
      },
      { timestamp: true }
    ),
  ],
});
export default logger;
