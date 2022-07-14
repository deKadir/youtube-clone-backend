import httpStatus from 'http-status';
import * as videoService from '../services/videoService.js';
import * as commentService from '../services/commentService.js';
import * as actionService from '../services/actionService.js';
import { createSchema } from '../schemas/Video.js';
import paginate from '../scripts/helpers/paginate.js';
import { splitKeywords } from '../scripts/helpers/str.js';

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

    req.body.keywords = splitKeywords(req.body.title, req.body.caption);

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

const search = async (req, res, next) => {
  const { search } = req.query;
  const keys = splitKeywords(search);
  try {
    const query = videoService
      .findAll({
        keywords: { $in: keys },
      })
      .sort({
        viewerCount: 'descending',
      });
    const data = await paginate(req, query);
    return res.success({ data });
  } catch (error) {
    next(error);
  }
};

const listBy = async (req, res, next) => {
  const { by } = req.query;
  const query = {
    private: false,
  };
  if (by === 'tag') {
    query.tags = { $in: req.query.tag };
  }
  if (by === 'category') {
    query.category = req.query.category;
  }
  if (by === 'channel') {
    query.owner = req.query.channel;
  }
  try {
    const videos = await paginate(req, videoService.findAll(query));
    return res.success({ videos });
  } catch (error) {
    next(error);
  }
};

const recommend = async (req, res, next) => {};

export {
  getVideo,
  uploadVideo,
  editVideo,
  getMyVideos,
  deleteVideo,
  getComments,
  // watchVideo,
  search,
  recommend,
  listBy,
};
