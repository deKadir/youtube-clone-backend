import { Action, Reply, Comment, Video } from '../models/index.js';

const models = {
  Reply,
  Comment,
  Video,
};
const create = (data) => {
  return Action.create(data);
};
const find = (where) => {
  return Action.findOne(where);
};
const findByIdAndDelete = (where) => {
  return Action.findByIdAndDelete(where);
};
const findAndUpdate = (where, update) => {
  return Action.findOneAndUpdate(where, update, { new: true });
};
const findAll = (where) => {
  return Action.find(where);
};

const findModelById = (model, id) => {
  return models[model].findById(id);
};
const findModelByIdAndUpdate = (model, id, update) => {
  return models[model].findByIdAndUpdate(id, update, { new: true });
};
const findModelAndDelete = (model, where) => {
  return models[model].findByIdAndUpdate(where);
};

export {
  find,
  findAll,
  create,
  findModelById,
  findModelByIdAndUpdate,
  findModelAndDelete,
  findByIdAndDelete,
  findAndUpdate,
};
