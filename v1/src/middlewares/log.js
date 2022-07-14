import logger from '../scripts/loggers/Request.js';
const log = (req, res, next) => {
  logger.log({
    level: 'info',
    message: req,
  });
  next();
};

export default log;
