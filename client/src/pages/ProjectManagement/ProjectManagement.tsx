import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectManagement.scss';

const ProjectManagement: React.FC = () => {
  return (
    <div className="project-management">
      <h1>Project Management</h1>
      <p>Manage your projects effectively.</p>
      <div className="project-management__actions">
        <Link to="/projects/create" className="btn btn-primary">Create Project</Link>
        <Link to="/projects/view" className="btn btn-primary">View Projects</Link>
      </div>
    </div>
  );
};

export default ProjectManagement;
