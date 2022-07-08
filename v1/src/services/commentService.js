import { Comment } from '../models/index.js';

const create = (data) => {
  return Comment.create(data);
};
const findAll = (where) => {
  return Comment.find(where);
};

const findAndDelete = (where) => {
  return Comment.findByIdAndDelete(where);
};
const findAndUpdate = (id, data) => {
  return Comment.findOneAndUpdate(id, data, { new: true });
};
export { create, findAll, findAndDelete, findAndUpdate };
