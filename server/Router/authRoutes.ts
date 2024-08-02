import express from 'express';
import { registerUser, activateUser, loginUser, logoutUser, updateAccessToken } from '../controllers/auth.controller';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Activate User
router.get('/activate/:activationToken', activateUser);

// Login User
router.post('/login', loginUser);

// Logout User
router.get('/logout', logoutUser);

// Update Access Token
router.get('/refresh', updateAccessToken);

export default router;
