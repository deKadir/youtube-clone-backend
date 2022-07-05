import express from 'express';
import { Action } from '../models/index.js';
const router = express.Router();

router.get('/hello', (req, res, next) => {
  Action.create({ test: '123' })
    .then((data) => {
      res.responseSuccess(data);
    })
    .catch((e) => res.responseError(e.message));
});

export default router;
