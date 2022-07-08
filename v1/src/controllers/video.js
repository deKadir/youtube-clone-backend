import httpStatus from 'http-status';
import * as videoService from '../services/videoService.js';
import * as commentService from '../services/commentService.js';
import * as watchSchema from '../services/watchService.js';
import { createSchema } from '../schemas/Video.js';

const getVideo = async (req, res, next) => {
  const { id } = req.query;
  const query = {
    _id: id,
    private: false,
  };
  try {
    const video = await videoService.find(query);

    if (video === null) return res.error('Video not found', 404);
    //increase viewer count
    await videoService.findAndUpdate(video, {
      viewerCount: video.viewerCount + 1,
    });

    return res.success({ video });
  } catch (error) {
    next(error);
  }
};
const uploadVideo = async (req, res, next) => {
  try {
    //video validation
    {
      const { thumbnail, video } = req.files;
      req.body.owner = req.user.id;
      req.body.file = video && video[0]?.filename;
      req.body.thumbnail = thumbnail && thumbnail[0]?.filename;
      req.body.tags = JSON.parse(req.body.tags);
      const { error } = createSchema.validate(
        {
          query: req.query,
          body: req.body,
        },
        { abortEarly: false }
      );
      if (error) {
        const errors = error.details.map((detail) => {
          const splited = detail.message.split('.')[1];
          return splited ? splited : detail.message;
        });
        return res.error(errors, httpStatus.BAD_REQUEST);
      }
    }

    //upload
    const video = await videoService.create(req.body);
    return res.success({ video });
  } catch (error) {
    next(error);
  }
};
const editVideo = async (req, res, next) => {
  const query = {
    owner: req.user.id,
    _id: req.query.videoId,
  };
  try {
    const video = await videoService.findAndUpdate(query, req.body);
    if (!video) return res.error('Video not found!', 401);
    return res.success({ video });
  } catch (error) {
    next(error);
  }
};
const getVideos = async (req, res, next) => {
  try {
    const videos = await videoService.findAll({
      owner: req.query.channel,
      private: false,
    });
    return res.success({ videos });
  } catch (error) {
    next(error);
  }
};
const getMyVideos = async (req, res, next) => {
  try {
    const videos = await videoService.findAll({
      owner: req.user.id,
    });
    return res.success({ videos });
  } catch (error) {
    next(error);
  }
};
const deleteVideo = async (req, res, next) => {
  const query = {
    _id: req.query.videoId,
    owner: req.user.id,
  };
  try {
    const video = await videoService.findAndDelete(query);
    if (!video) return res.error('Video not found!', 401);

    return res.success({ video });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  const { videoId } = req.query;
  try {
    const comments = commentService.findAll({ video: videoId });
    return res.success({ comments });
  } catch (error) {
    next(error);
  }
};

//watch history
const watchVideo = async (req, res, next) => {
  try {
    const query = {
      owner: req.user.id,
      video: req.query.id,
    };
    const watched = await watchSchema.find(query);
    if (!watched) {
      const watch = await watchSchema.create(query);
      if (!watch) return res.error('Not found', httpStatus.NOT_FOUND);
      return res.success({ watch });
    }
  } catch (error) {
    next(error);
  }
};

export {
  getVideo,
  uploadVideo,
  editVideo,
  getVideos,
  getMyVideos,
  deleteVideo,
  getComments,
  watchVideo,
};
