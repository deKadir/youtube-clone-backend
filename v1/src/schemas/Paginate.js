import Joi from 'joi';

const paginateQuery = {
  limit: Joi.number().default(12).min(1),
  page: Joi.number().required().min(1),
};
const paginateSchema = Joi.object({
  query: {
    ...paginateQuery,
  },
  body: {},
});
export { paginateQuery };
export default paginateSchema;
