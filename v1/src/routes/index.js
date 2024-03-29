import express from 'express';
import path from 'path';

import auth from './auth.js';
import channel from './channel.js';
import video from './video.js';
import comment from './comment.js';
import reply from './reply.js';
import playlist from './playlist.js';
import action from './action.js';
import category from './category.js';
const router = express.Router();

router.use('/auth', auth);
router.use('/channel', channel);
router.use('/video', video);
router.use('/comment', comment);
router.use('/reply', reply);
router.use('/playlist', playlist);
router.use('/action', action);
router.use('/category', category);

router.use(
  '/uploads',
  express.static(path.join(path.resolve(), '/v1/src/uploads'))
);

export default router;
