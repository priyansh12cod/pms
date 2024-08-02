// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/auth';

interface AuthContextType {
  isAuthenticated: boolean; // Add this line
  register: (userData: object) => void;
  activate: (activationToken: string) => void;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  refreshToken: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, register, activate, login, logout, refreshToken, loading, error } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, activate, login, logout, refreshToken, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
