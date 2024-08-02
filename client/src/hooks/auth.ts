// src/hooks/auth.ts

import { useState, useEffect } from 'react';
import { registerUser, activateUser, loginUser, logoutUser, updateAccessToken } from '../api/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Add this line

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const checkAuth = async () => {
      try {
        // Implement your logic to check if user is authenticated
        // For example, check if a valid token exists
        // setIsAuthenticated(true or false based on the check);
      } catch (err) {
        console.error('Auth check failed:', err);
      }
    };
    checkAuth();
  }, []);

  const register = async (userData: object) => {
    setLoading(true);
    try {
      await registerUser(userData);
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const activate = async (activationToken: string) => {
    setLoading(true);
    try {
      await activateUser(activationToken);
    } catch (err: any) {
      setError(err?.message || 'Activation failed.');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      await loginUser(credentials);
      setIsAuthenticated(true); // Set authentication status
    } catch (err: any) {
      setError(err?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setIsAuthenticated(false); // Update authentication status
    } catch (err: any) {
      setError(err?.message || 'Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    setLoading(true);
    try {
      await updateAccessToken();
    } catch (err: any) {
      setError(err?.message || 'Token refresh failed.');
    } finally {
      setLoading(false);
    }
  };

  return { isAuthenticated, register, activate, login, logout, refreshToken, loading, error };
};
