import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useProject } from '../hooks/project';

interface ProjectContextType {
  addProject: (projectData: object) => void;
  fetchProjects: () => Promise<any>;
  editProject: (projectId: string, projectData: object) => void;
  removeProject: (projectId: string) => void;
  loading: boolean;
  error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addProject, fetchProjects, editProject, removeProject, loading, error } = useProject();

  return (
    <ProjectContext.Provider value={{ addProject, fetchProjects, editProject, removeProject, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
