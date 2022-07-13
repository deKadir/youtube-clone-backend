import * as playlistService from '../services/playlistService.js';
import httpStatus from 'http-status';
import paginate from '../scripts/helpers/paginate.js';
const createPlaylist = async (req, res, next) => {
  req.body.owner = req.user.id;
  try {
    const playlist = await playlistService.create(req.body);
    return res.success({ playlist });
  } catch (error) {
    next(error);
  }
};
const getPlaylist = async (req, res, next) => {
  try {
    const playlist = await playlistService.findById(req.query.id);
    if (!playlist || (playlist.owner !== req.user?.id && playlist.private))
      return res.error('Not found', 404);

    return res.success({ playlist });
  } catch (error) {
    next(error);
  }
};
const listPlaylists = async (req, res, next) => {
  const query = {
    owner: req.query.channel,
  };
  if (query.owner !== req.user?.id) query.private = false;
  try {
    const data = await paginate(req, playlistService.findAll(query));
    return res.success({ data });
  } catch (error) {
    next(error);
  }
};

const updatePlaylist = async (req, res, next) => {
  const { action, playlistId, videoId } = req.query;

  const query = {
    _id: playlistId,
    owner: req.user.id,
  };
  try {
    let playlist = null;
    const update = {
      ...(action === 'add' && {
        $addToSet: {
          videos: videoId,
        },
      }),
      ...(action === 'remove' && {
        $pull: {
          videos: videoId,
        },
      }),
      ...(action === 'update' && {
        ...req.body,
      }),
    };
    playlist = await playlistService.findAndUpdate(query, update);

    if (!playlist) return res.error('An error occured');
    return res.success({ playlist });
  } catch (error) {
    next(error);
  }
};
const deletePlaylist = async (req, res, next) => {
  const query = {
    owner: req.user.id,
    _id: req.query.id,
  };
  try {
    const playlist = await playlistService.findAndDelete(query);
    if (!playlist) return res.error('Not found', httpStatus.NOT_FOUND);
    return res.success({ playlist });
  } catch (error) {
    next(error);
  }
};

export {
  createPlaylist,
  getPlaylist,
  listPlaylists,
  updatePlaylist,
  deletePlaylist,
};
