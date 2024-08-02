// src/api/auth.ts
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Register User
export const registerUser = (userData: object) => 
  axios.post(`${API_BASE_URL}/register`, userData);

// Activate User
export const activateUser = (activationToken: string) => 
  axios.get(`${API_BASE_URL}/activate/${activationToken}`);

// Login User
export const loginUser = (credentials: { email: string, password: string }) => 
  axios.post(`${API_BASE_URL}/login`, credentials);

// Logout User
export const logoutUser = () => 
  axios.get(`${API_BASE_URL}/logout`);

// Update Access Token
export const updateAccessToken = () => 
  axios.get(`${API_BASE_URL}/refresh`);
