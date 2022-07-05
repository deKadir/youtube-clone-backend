const handler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message,
  });
};
export default handler;
