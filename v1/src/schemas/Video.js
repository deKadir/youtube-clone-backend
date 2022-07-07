import Joi from 'joi';

const BaseSchema = {
  title: Joi.string().required(),
  caption: Joi.string().required(),
  tags: Joi.array().max(5),
  category: Joi.string().required(),
  commentSettings: Joi.string().valid('Enabled', 'Disabled', 'Restrict'),
  private: Joi.boolean(),
};
const getSchema = Joi.object({
  query: {
    id: Joi.string().required(),
  },
  body: {},
});
const getAllSchema = Joi.object({
  query: {
    channel: Joi.string().required(),
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
export { createSchema, getSchema, editSchema, deleteSchema, getAllSchema };
