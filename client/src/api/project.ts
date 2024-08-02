// src/api/project.ts
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create a new project
export const createProject = (projectData: object) => 
  axios.post(`${API_BASE_URL}/project`, projectData);

// Get all projects
export const getAllProjects = () => 
  axios.get(`${API_BASE_URL}/projects`);

// Update project
export const updateProject = (projectId: string, projectData: object) => 
  axios.put(`${API_BASE_URL}/project/${projectId}`, projectData);

// Delete project
export const deleteProject = (projectId: string) => 
  axios.delete(`${API_BASE_URL}/project/${projectId}`);
