import httpStatus from 'http-status';

import { decodeJwt, generateJwt } from '../scripts/helpers/jwt.js';
import * as channelService from '../services/channelService.js';
import { comparePassword, hashPassword } from '../scripts/helpers/crypto.js';
import { sendResetMail } from '../scripts/helpers/mail.js';

const register = async (req, res, next) => {
  try {
    const hashed = await hashPassword(req.body.password);
    if (!hashed) return res.error('An error occured');
    req.body.password = hashed;

    const channel = await channelService.insert(req.body);
    if (!channel) return res.error('An error occured');

    const token = generateJwt({ id: channel.id });
    return res.success({ token });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errorMessage = 'Wrong email or password';
  try {
    const channel = await channelService.find({ email });
    if (!channel) return res.error(errorMessage, 401);
    const result = await comparePassword(password, channel.password);
    if (result) {
      const token = generateJwt({ id: channel.id });
      return res.success({ token });
    } else {
      return res.error(errorMessage, 401);
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await channelService.find({ email });
    if (!user) return res.error('User not found', httpStatus.NOT_FOUND);
    const response = await sendResetMail(email);
    if (!!response)
      return res.success('Reset link has been sent to your email address!');
    return res.error('An error occured');
  } catch (error) {
    next(error);
  }
};

const reset = async (req, res, next) => {
  const { token } = req.query;
  try {
    const {
      channel: { email },
    } = decodeJwt(token);

    const hashed = await hashPassword(req.body.password);
    const found = await channelService.update({ email }, { password: hashed });
    if (found) return res.success('Success!');
    return res.error('An error occured');
  } catch (error) {
    next(error);
  }
};
export { register, login, reset, forgotPassword };
