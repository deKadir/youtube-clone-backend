import * as channelService from '../services/channelService.js';

const getChannel = async (req, res, next) => {
  const { id } = req.query;
  try {
    const channel = await channelService
      .findById(id)
      .select('name profile subscribers image');
    if (!channel) return res.error('Channel not found!', 404);
    return res.success({ channel });
  } catch (error) {
    next(error);
  }
};
const getProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const channel = await channelService.findById(id);
    return res.success({ channel });
  } catch (error) {
    next(error);
  }
};
const updateChannel = async (req, res, next) => {
  const { id } = req.user;
  if (req.file) {
    req.body.image = req.file.filename;
  } else {
    delete req.body['image'];
  }
  try {
    const channel = await channelService.findByIdAndUpdate(id, req.body);
    if (!channel) return res.error('Channel not found!', 404);
    return res.success({ channel });
  } catch (error) {
    next(error);
  }
};
const getVideos = async (req, res, next) => {};
const getSubscriptions = async (req, res, next) => {};
export { getChannel, getProfile, updateChannel, getVideos, getSubscriptions };
