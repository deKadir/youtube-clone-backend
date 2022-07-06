import Joi from 'joi';

const confirmSchema = {
  password: Joi.string().min(5).required(),
  passwordConfirm: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'passwords did not match' }),
};

const createSchema = Joi.object({
  query: {},
  body: {
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    image: Joi.string().email(),
    ...confirmSchema,
  },
});
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
    ...confirmSchema,
  }),
});

export { createSchema, loginSchema, forgotPasswordSchema, resetSchema };
