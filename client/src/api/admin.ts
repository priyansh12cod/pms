// src/api/admin.ts
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Get all users
export const getAllUsers = () => 
  axios.get(`${API_BASE_URL}/users`);

// Get user by ID
export const getUserById = (userId: string) => 
  axios.get(`${API_BASE_URL}/user/${userId}`);

// Update user role
export const updateUserRole = (userId: string, role: string) => 
  axios.put(`${API_BASE_URL}/user/${userId}/role`, { role });

// Delete user
export const deleteUser = (userId: string) => 
  axios.delete(`${API_BASE_URL}/user/${userId}`);
