import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useUser } from '../hooks/user';

interface UserContextType {
  fetchProfile: () => Promise<any>;
  updateProfile: (profileData: object) => void;
  changeUserPassword: (passwordData: { oldPassword: string; newPassword: string }) => void;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { fetchProfile, updateProfile, changeUserPassword, loading, error } = useUser();

  return (
    <UserContext.Provider value={{ fetchProfile, updateProfile, changeUserPassword, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
