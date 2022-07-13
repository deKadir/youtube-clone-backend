import * as channelService from '../services/channelService.js';
import * as subscribeService from '../services/subscribeService.js';
import paginate from '../scripts/helpers/paginate.js';
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
const subscribe = async (req, res, next) => {
  const query = {
    ...req.query,
    from: req.user.id,
  };
  try {
    //change notification settings
    if (query.action === 'notification') {
      const subscription = await subscribeService.findAndUpdate(
        { from: query.from, to: query.to },
        { notifications: req.query.notifications }
      );
      if (!subscription) return res.error('Not found');
      return res.success({ subscription });
    }
    //unsubscribe
    {
      const result = await subscribeService.findAndDelete(query).populate('to');
      if (result) {
        const channel = await channelService
          .findByIdAndUpdate(
            { _id: result.to._id },
            { subscribers: result.to.subscribers - 1 }
          )
          .select('subscribers');
        return res.success({ channel });
      }
    }
    //subscribe
    {
      const result = await (
        await subscribeService.create(query)
      ).populate('to');
      const channel = await channelService
        .findByIdAndUpdate(
          { _id: result.to._id },
          { subscribers: result.to.subscribers + 1 }
        )
        .select('subscribers');
      return res.success({ channel });
    }
  } catch (error) {
    next(error);
  }
};

const getSubscriptions = async (req, res, next) => {
  try {
    const data = await paginate(
      req,
      subscribeService
        .findAll({ from: req.user.id })
        .populate({ path: 'to', select: 'name image subscribers' })
    );
    return res.success({ data });
  } catch (error) {
    next(error);
  }
};
export { getChannel, getProfile, updateChannel, getSubscriptions, subscribe };
