import { Reply } from '../models/index.js';

const create = (data) => {
  return Reply.create(data);
};
const findAll = (where) => {
  return Reply.find(where);
};

const findAndDelete = (where) => {
  return Reply.findByIdAndDelete(where);
};
const findAndUpdate = (id, data) => {
  return Reply.findOneAndUpdate(id, data, { new: true });
};
export { create, findAll, findAndDelete, findAndUpdate };
