import express from 'express';
import authenticate from './../middlewares/authenticate.js';
import validate from './../middlewares/validate.js';
import {
  getProfile,
  getChannel,
  updateChannel,
} from '../controllers/channel.js';
import { getSchema, updateSchema } from '../schemas/Channel.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router.get('/', validate(getSchema), getChannel);

const uploadConfig = {
  folder: 'profile',
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

export default router;
