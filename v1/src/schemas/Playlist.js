import Joi from 'joi';
import { paginateQuery } from './Paginate.js';
const createSchema = Joi.object({
  query: {},
  body: {
    title: Joi.string().required(),
    private: Joi.boolean().required(),
  },
});
const getSchema = Joi.object({
  query: {
    id: Joi.string().required(),
  },
  body: {},
});
const listSchema = Joi.object({
  query: {
    channel: Joi.string().required(),
    ...paginateQuery,
  },
  body: {},
});
const updateSchema = Joi.object({
  query: {
    action: Joi.string().valid('add', 'remove', 'update').required(),
    playlistId: Joi.string().required(),
    videoId: Joi.string(),
  },
  body: {
    title: Joi.string(),
    private: Joi.boolean(),
  },
});

export { createSchema, getSchema, listSchema, updateSchema };
