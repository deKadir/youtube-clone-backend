import * as categoryService from '../../services/categoryService.js';

const categories = [
  {
    title: 'Movie',
  },
  {
    title: 'Sport',
  },
  {
    title: 'Music',
  },
  {
    title: 'Comedy',
  },
  {
    title: 'Educational',
  },
];
const loadCategories = async () => {
  try {
    const length = await categoryService.count();
    if (length > 0) return;
    const result = await categoryService.insert(categories);
    console.log('Categories loaded.');
  } catch (error) {
    next(error);
  }
};
export default loadCategories;
