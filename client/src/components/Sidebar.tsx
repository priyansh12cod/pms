// src/components/Sidebar/Sidebar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <Link to="/dashboard/users">Manage Users</Link>
        </li>
        <li className="sidebar__item">
          <Link to="/dashboard/projects">Manage Projects</Link>
        </li>
        <li className="sidebar__item">
          <Link to="/dashboard/create-project">Create Project</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
