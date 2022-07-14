import express from 'express';

import * as videoController from '../controllers/video.js';
import authenticate, { authCheck } from './../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';

import {
  deleteSchema,
  editSchema,
  getAllSchema,
  getCommentsSchema,
  getSchema,
  searchSchema,
} from '../schemas/Video.js';
import upload from './../middlewares/upload.js';
import paginateSchema from './../schemas/Paginate.js';

const router = express.Router();

router.get('/', validate(getSchema), authCheck, videoController.getVideo);
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
router.get(
  '/myVideos',
  validate(paginateSchema),
  authenticate,
  videoController.getMyVideos
);
router.get(
  '/comments',
  validate(getCommentsSchema),
  authCheck,
  videoController.getComments
);
router.delete(
  '/delete',
  validate(deleteSchema),
  authenticate,
  videoController.deleteVideo
);
router.get('/v', validate(searchSchema), videoController.search);
// router.post(
//   '/watch',
//   validate(getSchema),
//   authenticate,
//   videoController.watchVideo
// );
export default router;
