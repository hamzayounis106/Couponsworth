import express from 'express';
import { submitContactForm, getMessages } from '../controllers/contactController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact
router.post('/', submitContactForm);

// GET /api/contact - protected and admin-only route for fetching messages
router.get('/', protect, admin, getMessages);

export default router;
