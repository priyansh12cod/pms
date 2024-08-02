import express from 'express';
import { getAllUsers, getUserById, updateUserRole, deleteUser } from '../controllers/adminController';
import { isAuthenticated, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Get all users
router.get('/users', isAuthenticated, authorizeRoles('Admin'), getAllUsers);

// Get user by ID
router.get('/user/:id', isAuthenticated, authorizeRoles('Admin'), getUserById);

// Update user role
router.put('/user/:id/role', isAuthenticated, authorizeRoles('Admin'), updateUserRole);

// Delete user
router.delete('/user/:id', isAuthenticated, authorizeRoles('Admin'), deleteUser);

export default router;
