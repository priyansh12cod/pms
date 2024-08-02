// src/pages/AdminDashboard/UserManagement/UserManagement.tsx

import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api/admin';
import './UserManagement.scss';

interface User {
  id: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading

      try {
        const response = await getAllUsers();
        setUsers(response.data); // Assuming API response structure: { data: User[] }
        setError(null);
      } catch (error) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
