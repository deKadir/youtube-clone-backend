import httpStatus from 'http-status';

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(
    {
      body: req.body,
      query: req.query,
    },
    { abortEarly: false }
  );
  if (error) {
    const errors = error.details.map((detail) => {
      const splited = detail.message.split('.')[1];
      return splited ? splited : detail.message;
    });
    return res.error(errors, httpStatus.BAD_REQUEST);
  }
  return next();
};

export default validate;
