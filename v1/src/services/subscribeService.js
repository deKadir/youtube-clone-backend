import { Subscribe } from '../models/index.js';

const create = (data) => {
  return Subscribe.create(data);
};
const find = (where) => {
  return Subscribe.findOne(where);
};
const findAll = (where) => {
  return Subscribe.find(where);
};
const findByIdAndUpdate = (id, data) => {
  return Subscribe.findByIdAndUpdate(id, data);
};
const findAndUpdate = (where, data) => {
  return Subscribe.findOneAndUpdate(where, data, { new: true });
};
const findAndDelete = (where) => {
  return Subscribe.findOneAndDelete(where);
};
export {
  create,
  find,
  findAll,
  findAndDelete,
  findByIdAndUpdate,
  findAndUpdate,
};
