import express from 'express';
import auth from './auth.js';
import channel from './channel.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/channel', channel);
export default router;
