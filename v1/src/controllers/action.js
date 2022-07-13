import * as actionService from '../services/actionService.js';
import likeReducer from '../scripts/helpers/reducers/likeReducer.js';
const action = async (req, res, next) => {
  const { to, model, type } = req.query;
  req.query.owner = req.user.id;
  try {
    //check if model with id exist
    const found = await actionService.findModelById(model, to);
    if (!found) return res.error(`${model} not found`, 404);
    const query = {
      owner: req.user.id,
      to,
    };
    let existing = await actionService.find(query);
    let foundModel = await actionService.findModelById(model, to);
    if (existing) {
      if (existing.type === type) {
        await actionService.findByIdAndDelete(existing._id);
        foundModel = likeReducer(foundModel, type, 'DECREASE');
      } else {
        existing.type = type;
        foundModel = likeReducer(foundModel, type, 'EXCHANGE');

        await existing.save();
      }
    } else {
      await actionService.create(req.query);
      foundModel = likeReducer(foundModel, type, 'INCREASE');
    }
    await foundModel.save();
    return res.success({
      result: foundModel,
    });
  } catch (error) {
    next(error);
  }
};

// const query = {
//   owner: req.query.owner,
//   to,
// };
// //delete if action exist
// const deleted = await actionService.findAndDelete(model, query);
// //create new action if user creates new
// if (!deleted || deleted.type !== type) {
//   const action = await (
//     await actionService.create(req.query)
//   ).populate({
//     model,
//     path: 'to',
//   });
//   if (!action) return res.error('An error occured!');
// }

// //update like and dislike count
// const likeCount = await actionService.findAll({ to, type: 'Like' }).count();
// const dislikeCount = await actionService
//   .findAll({ to, type: 'Dislike' })
//   .count();

// const result = await actionService.findModelByIdAndUpdate(
//   model,
//   found._id,
//   { likeCount, dislikeCount }
// );
// return res.success({ result });
export { action };
