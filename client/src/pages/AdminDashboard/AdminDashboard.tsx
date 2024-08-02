// src/pages/AdminDashboard/AdminDashboard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './AdminDashboard.scss';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="admin-dashboard__content">
        <h1>Admin Dashboard</h1>
        <p>Manage users and projects here.</p>
        <div className="admin-dashboard__actions">
          <Link to="/admin/users" className="btn btn-primary">Manage Users</Link>
          <Link to="/admin/projects" className="btn btn-primary">Manage Projects</Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
