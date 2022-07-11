import express from 'express';

import authenticate from './../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import {
  createPlaylist,
  deletePlaylist,
  getPlaylist,
  listPlaylists,
  updatePlaylist,
} from '../controllers/playlist.js';
import {
  createSchema,
  getSchema,
  listSchema,
  updateSchema,
} from '../schemas/Playlist.js';

const router = express.Router();

router.get('/get', validate(getSchema), getPlaylist);
router.get('/list', validate(listSchema), authenticate, listPlaylists);
router.post('/create', validate(createSchema), authenticate, createPlaylist);
router.patch('/edit', validate(updateSchema), authenticate, updatePlaylist);
router.delete('/delete', validate(getSchema), authenticate, deletePlaylist);

export default router;
