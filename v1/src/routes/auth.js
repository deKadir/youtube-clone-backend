import mongoose from 'express';

import validate from '../middlewares/validate.js';
import { login, register, reset, forgotPassword } from '../controllers/auth.js';
import {
  createSchema,
  loginSchema,
  forgotPasswordSchema,
  resetSchema,
} from '../schemas/Channel.js';
const router = mongoose.Router();
router.post('/register', validate(createSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/forgotPassword', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset', validate(resetSchema), reset);

export default router;
