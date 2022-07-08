import express from 'express';

import authenticate from './../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import {
  addComment,
  editComment,
  deleteComment,
} from '../controllers/comment.js';
import { createSchema, editSchema, deleteSchema } from '../schemas/Comment.js';

const router = express.Router();

router.post('/add', validate(createSchema), authenticate, addComment);
router.patch('/edit', validate(editSchema), authenticate, editComment);
router.delete('/delete', validate(deleteSchema), authenticate, deleteComment);

export default router;
