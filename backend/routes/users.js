import express from 'express';
import { protect } from '../middleware/auth.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Profile route must come before any route that uses parameters like :id
router.get('/profile', protect, userController.getProfile); 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', protect, userController.updateUserById); 
router.delete('/:id', protect, userController.deleteUserById);

export default router;
