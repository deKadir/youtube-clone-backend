const responseHandler = (req, res, next) => {
  res.responseSuccess = (data, status) => {
    return res.status(status || 200).json({
      success: true,
      ...generatePayload(data),
    });
  };
  res.responseError = (message, status) => {
    return res.status(status || 500).json({
      success: false,
      message,
    });
  };
  next();
};

const generatePayload = (data) => {
  if (typeof data === 'string') {
    return {
      message: data,
    };
  }
  if (typeof data === 'object') {
    return { data };
  }
};

export default responseHandler;
