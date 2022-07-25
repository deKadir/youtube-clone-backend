import * as categoryService from '../services/categoryService.js';

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.findAll({});
    return res.success({ categories });
  } catch (error) {
    next(error);
  }
};

export { getCategories };
