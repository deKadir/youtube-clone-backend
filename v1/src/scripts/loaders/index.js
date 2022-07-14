import loadCategories from './category.js';
import connectToDb from './db.js';
export default () => {
  connectToDb();
  loadCategories();
};
