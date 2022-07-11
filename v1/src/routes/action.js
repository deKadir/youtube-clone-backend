import express from 'express';

import authenticate from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import { action } from '../controllers/action.js';
import { actionSchema } from '../schemas/Action.js';

const router = express.Router();

router.post('/', validate(actionSchema), authenticate, action);

export default router;
