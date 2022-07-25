import { Category } from '../models/index.js';

const insert = (data) => {
  return Category.insertMany(data);
};

const findAll = (query) => {
  return Category.find(query);
};
const count = (where) => {
  return Category.find(where).count();
};

export { insert, count, findAll };
