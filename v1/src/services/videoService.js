import { Video } from '../models/index.js';

const create = (video) => {
  return Video.create(video);
};
const find = (where) => {
  return Video.findOne(where);
};
const findById = (id) => {
  return Video.findById(id);
};
const findAll = (where) => {
  return Video.find(where);
};
const findAndDelete = (where) => {
  return Video.findOneAndDelete(where);
};
const findAndUpdate = (where, data) => {
  return Video.findOneAndUpdate(where, data, { new: true });
};
const findByIdAndUpdate = (id, data) => {
  return Video.findByIdAndUpdate(id, data, { new: true });
};

export {
  find,
  findAll,
  findAndDelete,
  findByIdAndUpdate,
  findById,
  findAndUpdate,
  create,
};
