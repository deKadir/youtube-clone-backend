import { Channel } from '../models/index.js';

const select = 'name email image createdAt';

const insert = (data) => {
  return Channel.create(data);
};

const find = (where) => {
  return Channel.findOne(where);
};
const findById = (id) => {
  return Channel.findById(id);
};

const update = (where, data) => {
  return Channel.findOneAndUpdate(where, data, { new: true }).select(select);
};
const findByIdAndUpdate = (id, data) => {
  return Channel.findByIdAndUpdate(id, data, { new: true }).select(select);
};

const remove = (where) => {};

export { insert, find, update, remove, findById, findByIdAndUpdate };
