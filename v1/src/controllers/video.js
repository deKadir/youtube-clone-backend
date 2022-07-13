import httpStatus from 'http-status';
import * as videoService from '../services/videoService.js';
import * as commentService from '../services/commentService.js';
import * as actionService from '../services/actionService.js';
import { createSchema } from '../schemas/Video.js';
import paginate from '../scripts/helpers/paginate.js';

const getVideo = async (req, res, next) => {
  const { id } = req.query;
  let query = {
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
    // get video action if user authenticated
    if (req.user) {
      const action = await actionService
        .find({
          owner: req.user.id,
          to: id,
        })
        .select('type');
      Object.assign(video._doc, { action: action._doc });
    }
    return res.success({ video: video._doc });
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
    const data = await paginate(
      req,
      videoService.findAll({
        owner: req.query.channel,
        private: false,
      })
    );

    return res.success({ data });
  } catch (error) {
    next(error);
  }
};
const getMyVideos = async (req, res, next) => {
  try {
    const data = await paginate(
      req,
      videoService.findAll({
        owner: req.user.id,
      })
    );
    return res.success({ data });
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
  const { id } = req.query;
  try {
    const data = await paginate(req, commentService.findAll({ video: id }));

    return res.success({ data });
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
  // watchVideo,
};
