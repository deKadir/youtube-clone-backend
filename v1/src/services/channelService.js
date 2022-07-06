import { Channel } from '../models/index.js';

const insert = (data) => {
  return Channel.create(data);
};

const find = (where) => {
  return Channel.findOne(where);
};

const update = (where, data) => {
  return Channel.findOneAndUpdate(where, data, { new: true });
};

const remove = (where) => {};

export { insert, find, update, remove };
