import * as commentService from '../services/commentService.js';
import * as videoService from '../services/videoService.js';
import httpStatus from 'http-status';
const addComment = async (req, res, next) => {
  req.body.owner = req.user.id;

  try {
    const video = await videoService.findById(req.body.video);
    if (!video) return res.error('Video not found', httpStatus.NOT_FOUND);
    if (video.commentSettings === 'Disabled' || video.private) {
      return res.error('An error occured', httpStatus.NOT_ACCEPTABLE);
    }
    if (video.commentSettings === 'Restrict') {
      req.body.status = 'Pending';
    }
    const comment = await commentService.create(req.body);
    return res.success({ comment });
  } catch (error) {
    next(error);
  }
};
const editComment = async (req, res, next) => {
  const { id } = req.query;
  const query = {
    _id: id,
    owner: req.user.id,
  };
  try {
    const comment = await commentService.findAndUpdate(query, req.body);
    if (!comment) return res.error('Not found', httpStatus.NOT_FOUND);
    return res.success({ comment });
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  const { id } = req.query;

  const query = {
    _id: id,
    owner: req.user.id,
  };

  try {
    const comment = await commentService.findAndDelete(query);
    if (!comment) return res.error('Not found', httpStatus.NOT_FOUND);
    return res.success({ comment });
  } catch (error) {
    next(error);
  }
};

export { addComment, deleteComment, editComment };