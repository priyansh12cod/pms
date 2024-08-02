import express from 'express';
import { createProject, getAllProjects, updateProject, deleteProject } from '../controllers/projectController';
import { isAuthenticated, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// Create a new project
router.post('/project', isAuthenticated, createProject);

// Get all projects
router.get('/projects', isAuthenticated, getAllProjects);

// Update project
router.put('/project/:id', isAuthenticated, updateProject);

// Delete project
router.delete('/project/:id', isAuthenticated, authorizeRoles('Admin'), deleteProject);

export default router;
