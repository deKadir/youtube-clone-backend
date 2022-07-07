import express from 'express';
import authenticate from './../middlewares/authenticate.js';
import validate from './../middlewares/validate.js';
import {
  getProfile,
  getChannel,
  updateChannel,
  subscribe,
  getSubscriptions,
  notificationSettings,
} from '../controllers/channel.js';
import {
  getSchema,
  notificationSchema,
  subscribeSchema,
  updateSchema,
} from '../schemas/Channel.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router.get('/', validate(getSchema), getChannel);

const uploadConfig = {
  folder: 'profiles',
  fileType: 'image',
};
router.patch(
  '/update',
  validate(updateSchema),
  authenticate,
  upload(uploadConfig).single('image'),
  updateChannel
);
router.get('/profile', authenticate, getProfile);
router.post('/subscribe', validate(subscribeSchema), authenticate, subscribe);
router.post(
  '/notifications',
  validate(notificationSchema),
  authenticate,
  notificationSettings
);
router.get('/subscriptions', authenticate, getSubscriptions);
export default router;
