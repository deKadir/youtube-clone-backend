import jwt from 'jsonwebtoken';
const generateJwt = (data, expire) => {
  return jwt.sign(
    {
      channel: data,
    },
    process.env.JWT_SECRET,
    { expiresIn: expire ? expire : process.env.JWT_EXPIRE }
  );
};
const decodeJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateJwt, decodeJwt };
