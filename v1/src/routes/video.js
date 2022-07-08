import express from 'express';

import * as videoController from '../controllers/video.js';
import authenticate from './../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';

import {
  deleteSchema,
  editSchema,
  getAllSchema,
  getSchema,
} from '../schemas/Video.js';
import upload from './../middlewares/upload.js';

const router = express.Router();

router.get('/', validate(getSchema), videoController.getVideo);
router.post(
  '/upload',
  upload({
    folder: 'videos',
  }).fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  authenticate,
  videoController.uploadVideo
);
router.patch(
  '/edit',
  validate(editSchema),
  authenticate,
  videoController.editVideo
);
router.get('/all', validate(getAllSchema), videoController.getVideos);
router.get('/myVideos', authenticate, videoController.getMyVideos);
router.delete(
  '/delete',
  validate(deleteSchema),
  authenticate,
  videoController.deleteVideo
);
// router.post(
//   '/watch',
//   validate(getSchema),
//   authenticate,
//   videoController.watchVideo
// );
export default router;
