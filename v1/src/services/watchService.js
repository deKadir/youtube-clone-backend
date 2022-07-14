import { Watch } from '../models/index.js';

const create = (data) => {
  return Watch.create(data);
};

const find = (where) => {
  return Watch.findOne(where);
};

export { create, find };
