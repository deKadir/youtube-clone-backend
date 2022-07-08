import express from 'express';
import auth from './auth.js';
import channel from './channel.js';
import video from './video.js';
import comment from './comment.js';
const router = express.Router();

router.use('/auth', auth);
router.use('/channel', channel);
router.use('/video', video);
router.use('/comment', comment);
export default router;
