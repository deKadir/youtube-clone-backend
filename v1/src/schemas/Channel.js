import Joi from 'joi';

const BaseSchema = {
  name: Joi.string().min(4),
  email: Joi.string().email(),
  image: Joi.string(),
};

const ConfirmSchema = {
  password: Joi.string().min(5).required(),
  passwordConfirm: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'passwords did not match' }),
};

const createSchema = Joi.object({
  query: {},
  body: {
    ...BaseSchema,
    ...ConfirmSchema,
  },
}).required();
const loginSchema = Joi.object({
  query: {},
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  },
});
const forgotPasswordSchema = Joi.object({
  query: {},
  body: {
    email: Joi.string().email().required(),
  },
});
const resetSchema = Joi.object({
  query: Joi.object({
    token: Joi.string().required(),
  }),

  body: Joi.object({
    ...ConfirmSchema,
  }),
});

const getSchema = Joi.object({
  query: {
    id: Joi.string().required().min(5),
  },
  body: {},
});
const updateSchema = Joi.object({
  query: {},
  body: {
    ...BaseSchema,
  },
});
const subscribeSchema = Joi.object({
  query: {
    to: Joi.string().required(),
  },
  body: {},
});
const notificationSchema = Joi.object({
  query: {
    to: Joi.string().required(),
    notifications: Joi.boolean().required(),
  },
  body: {},
});
export {
  createSchema,
  loginSchema,
  forgotPasswordSchema,
  resetSchema,
  getSchema,
  updateSchema,
  subscribeSchema,
  notificationSchema,
};
