import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../api/user';
import './Profile.scss';

interface UserProfile {
  name: string;
  email: string;
  // Add other profile fields as necessary
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setProfile(formData);
      setEditable(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-info">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editable}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editable}
          />
        </label>
        {editable && (
          <button onClick={handleSave}>Save</button>
        )}
        <button onClick={() => setEditable(!editable)}>
          {editable ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
