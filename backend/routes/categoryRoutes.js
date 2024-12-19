import express from 'express';
import  { createCategory, deleteCategory, filterCategories, getCategories, getCategoryById, updateCategory } from '../controllers/CategoriesController.js';

const router = express.Router();

// CREATE - Add a new category
router.post('/create-category', createCategory);

// READ - Get all categories (with optional filters)
router.get('/categories', getCategories);

// READ - Get category by ID
router.get('/categories/:id', getCategoryById);

// UPDATE - Update category by ID
router.put('/categories/:id', updateCategory);

// DELETE - Delete category by ID
router.delete('/categories/:id', deleteCategory);

// FILTER - Filter categories by status or other criteria
router.get('/categories/filter', filterCategories);

export default router;
