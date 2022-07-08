import * as replyService from '../services/replyService.js';
import httpStatus from 'http-status';
const addReply = async (req, res, next) => {
  req.body.owner = req.user.id;

  try {
    const reply = await replyService.create(req.body);
    return res.success({ reply });
  } catch (error) {
    next(error);
  }
};
const editReply = async (req, res, next) => {
  const { id } = req.query;
  const query = {
    _id: id,
    owner: req.user.id,
  };
  try {
    const reply = await replyService.findAndUpdate(query, req.body);
    if (!reply) return res.error('Not found', httpStatus.NOT_FOUND);
    return res.success({ reply });
  } catch (error) {
    next(error);
  }
};
const deleteReply = async (req, res, next) => {
  const { id } = req.query;

  const query = {
    _id: id,
    owner: req.user.id,
  };

  try {
    const reply = await replyService.findAndDelete(query);
    if (!reply) return res.error('Not found', httpStatus.NOT_FOUND);
    return res.success({ reply });
  } catch (error) {
    next(error);
  }
};

export { addReply, deleteReply, editReply };
