import Joi from 'joi';

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
export { createSchema, editSchema, deleteSchema };
