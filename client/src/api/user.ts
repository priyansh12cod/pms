// src/api/user.ts
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Get user profile
export const getUserProfile = () => 
  axios.get(`${API_BASE_URL}/profile`);

// Update user profile
export const updateUserProfile = (profileData: object) => 
  axios.put(`${API_BASE_URL}/profile`, profileData);

// Change user password
export const changePassword = (passwordData: { oldPassword: string, newPassword: string }) => 
  axios.put(`${API_BASE_URL}/password`, passwordData);
