import express from 'express';
import auth from './auth.js';
import channel from './channel.js';
import video from './video.js';
const router = express.Router();

router.use('/auth', auth);
router.use('/channel', channel);
router.use('/video', video);
export default router;
