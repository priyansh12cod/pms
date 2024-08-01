import express from 'express';
import { getUserProfile, updateUserProfile, changePassword } from '../controllers/userController';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile', isAuthenticated, getUserProfile);

// Update user profile
router.put('/profile', isAuthenticated, updateUserProfile);

// Change password
router.put('/password', isAuthenticated, changePassword);

export default router;
