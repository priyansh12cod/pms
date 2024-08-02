import { useState } from 'react';
import { getAllUsers, getUserById, updateUserRole, deleteUser } from '../api/admin';

export const useAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (userId: string) => {
    setLoading(true);
    try {
      const response = await getUserById(userId);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const modifyUserRole = async (userId: string, role: string) => {
    setLoading(true);
    try {
      await updateUserRole(userId, role);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (userId: string) => {
    setLoading(true);
    try {
      await deleteUser(userId);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { fetchUsers, fetchUserById, modifyUserRole, removeUser, loading, error };
};
