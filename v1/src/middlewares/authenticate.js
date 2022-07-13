import { decodeJwt } from '../scripts/helpers/jwt.js';
const authenticate = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) return res.error('authentication token is required', 403);
    const user = decodeJwt(token);
    if (!user) return res.error('authentication error!', 403);
    req.user = user.channel;
    next();
  } catch (error) {
    next(error);
  }
};
export const authCheck = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    const user = decodeJwt(token);
    req.user = user.channel;
    next();
  } catch (error) {
    next();
  }
};
export default authenticate;
