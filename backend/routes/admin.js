import express from 'express';
import { getAllUsers, promoteToAdmin, manageUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users/:userId/promote', promoteToAdmin);
router.get('/manage-users', manageUsers);

export default router;
