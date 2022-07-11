import { Playlist } from '../models/index.js';

const create = (data) => {
  return Playlist.create(data);
};
const findAll = (where) => {
  return Playlist.find(where);
};
const find = (where) => {
  return Playlist.findOne(where);
};
const findById = (id) => {
  return Playlist.findById(id);
};

const findAndDelete = (where) => {
  return Playlist.findOneAndDelete(where);
};
const findAndUpdate = (query, data) => {
  return Playlist.findOneAndUpdate(query, data, { new: true });
};
export { create, findAll, findAndDelete, findAndUpdate, find, findById };
