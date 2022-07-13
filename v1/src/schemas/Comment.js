import Joi from 'joi';
import { paginateQuery } from './Paginate.js';
const createSchema = Joi.object({
  query: {},
  body: {
    video: Joi.string().required(),
    caption: Joi.string().required(),
  },
});
const editSchema = Joi.object({
  query: {
    id: Joi.string().required(),
  },
  body: {
    caption: Joi.string().required(),
  },
});
const deleteSchema = Joi.object({
  query: {
    id: Joi.string().required(),
  },
  body: {},
});
const repliesSchema = Joi.object({
  query: {
    id: Joi.string().required(),
    ...paginateQuery,
  },
  body: {},
});
export { createSchema, editSchema, deleteSchema, repliesSchema };
