import express from 'express';

import authenticate from './../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import {
  addComment,
  editComment,
  deleteComment,
  getReplies,
} from '../controllers/comment.js';
import {
  createSchema,
  editSchema,
  deleteSchema,
  repliesSchema,
} from '../schemas/Comment.js';

const router = express.Router();

router.get('/replies', validate(repliesSchema), getReplies);
router.post('/add', validate(createSchema), authenticate, addComment);
router.patch('/edit', validate(editSchema), authenticate, editComment);
router.delete('/delete', validate(deleteSchema), authenticate, deleteComment);

export default router;
