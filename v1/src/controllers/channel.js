import * as channelService from '../services/channelService.js';
import * as subscribeService from '../services/subscribeService.js';
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

const notificationSettings = async (req, res, next) => {
  const { to, notifications } = req.query;
  const from = req.user.id;
  try {
    const subscription = await subscribeService.findAndUpdate(
      { from, to },
      { notifications }
    );
    if (!subscription) return res.error('Not found');
    return res.success({ subscription });
  } catch (error) {
    next(error);
  }
};
const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await subscribeService
      .findAll({ from: req.user.id })
      .populate({ path: 'to', select: 'name image subscribers' });
    return res.success({ subscriptions });
  } catch (error) {
    next(error);
  }
};
export {
  getChannel,
  getProfile,
  updateChannel,
  getSubscriptions,
  subscribe,
  notificationSettings,
};
