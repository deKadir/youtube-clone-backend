import express from 'express';
import { getCategories } from '../controllers/category.js';

const router = express.Router();

router.get('/', getCategories);

export default router;
