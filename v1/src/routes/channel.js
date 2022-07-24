import express from 'express';
import authenticate, { authCheck } from './../middlewares/authenticate.js';
import validate from './../middlewares/validate.js';
import {
  getProfile,
  getChannel,
  updateChannel,
  subscribe,
  getSubscriptions,
} from '../controllers/channel.js';
import {
  getSchema,
  subscribeSchema,
  updateSchema,
} from '../schemas/Channel.js';
import upload from '../middlewares/upload.js';
import paginateSchema from './../schemas/Paginate.js';
const router = express.Router();

router.get('/', validate(getSchema), authCheck, getChannel);

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

router.get(
  '/subscriptions',
  validate(paginateSchema),
  authenticate,
  getSubscriptions
);
export default router;
