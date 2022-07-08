import express from 'express';

import authenticate from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import { addReply, editReply, deleteReply } from '../controllers/reply.js';
import { createSchema, editSchema, deleteSchema } from '../schemas/Reply.js';

const router = express.Router();

router.post('/add', validate(createSchema), authenticate, addReply);
router.patch('/edit', validate(editSchema), authenticate, editReply);
router.delete('/delete', validate(deleteSchema), authenticate, deleteReply);

export default router;
