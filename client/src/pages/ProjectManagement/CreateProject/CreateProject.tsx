import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../../api/project';
import './CreateProject.scss';

const CreateProject: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({ name, description });
      navigate('/projects/view');
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="create-project">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Project Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
