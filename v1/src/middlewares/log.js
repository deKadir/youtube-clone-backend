import logger from '../scripts/helpers/logger/Request.js';
const log = (req, res, next) => {
  logger.log({
    level: 'info',
    message: req,
  });
  next();
};

export default log;
