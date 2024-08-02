import { useState } from 'react';
import { getUserProfile, updateUserProfile, changePassword } from '../api/user';

export const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getUserProfile();
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

  const updateProfile = async (profileData: object) => {
    setLoading(true);
    try {
      await updateUserProfile(profileData);
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

  const changeUserPassword = async (passwordData: { oldPassword: string, newPassword: string }) => {
    setLoading(true);
    try {
      await changePassword(passwordData);
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

  return { fetchProfile, updateProfile, changeUserPassword, loading, error };
};
