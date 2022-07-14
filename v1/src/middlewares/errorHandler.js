import logger from '../scripts/helpers/logger/Error.js';
const handler = (error, req, res, next) => {
  if (error.code === 11000) {
    const fields = Object.keys(error.keyPattern).join(',');
    error.message = `${fields} already in use`;
  }
  logger.log({
    level: 'error',
    message: {
      error,
      request: req,
    },
  });
  res.status(error.status || 500).json({
    success: false,
    message: error.message,
  });
};
export default handler;
