import Joi from 'joi';
import { paginateQuery } from './Paginate.js';

const BaseSchema = {
  title: Joi.string().required().max(50),
  caption: Joi.string().required().max(500),
  tags: Joi.array().max(5),
  category: Joi.string().required(),
  commentSettings: Joi.string().valid('Enabled', 'Disabled', 'Restrict'),
  private: Joi.boolean(),
};
const getCommentsSchema = Joi.object({
  query: {
    id: Joi.string().required(),
    ...paginateQuery,
  },
  body: {},
});
const getSchema = Joi.object({
  query: {
    id: Joi.string().required(),
  },
  body: {},
});
const getAllSchema = Joi.object({
  query: {
    channel: Joi.string().required(),
    ...paginateQuery,
  },
  body: {},
});
const createSchema = Joi.object({
  query: {},
  body: {
    owner: Joi.string().required(),
    thumbnail: Joi.string().required(),
    file: Joi.string().required(),

    ...BaseSchema,
  },
});
const editSchema = Joi.object({
  query: {
    videoId: Joi.string().required(),
  },
  body: {
    ...BaseSchema,
  },
});
const deleteSchema = Joi.object({
  query: {
    videoId: Joi.string().required(),
  },
  body: {},
});
const searchSchema = Joi.object({
  query: {
    search: Joi.string().required(),
    ...paginateQuery,
  },
  body: {},
});
export {
  createSchema,
  getCommentsSchema,
  editSchema,
  deleteSchema,
  getAllSchema,
  getSchema,
  searchSchema,
};
