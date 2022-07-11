import Joi from 'joi';

const actionSchema = Joi.object({
  query: {
    type: Joi.string().required().valid('Like', 'Dislike'),
    to: Joi.string().required().required(),
    model: Joi.string().valid('Comment', 'Reply', 'Video').required(),
  },
  body: {},
});

export { actionSchema };
