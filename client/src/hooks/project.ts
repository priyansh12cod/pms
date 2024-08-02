import { useState } from 'react';
import { createProject, getAllProjects, updateProject, deleteProject } from '../api/project';

export const useProject = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addProject = async (projectData: object) => {
    setLoading(true);
    try {
      await createProject(projectData);
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

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getAllProjects();
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

  const editProject = async (projectId: string, projectData: object) => {
    setLoading(true);
    try {
      await updateProject(projectId, projectData);
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

  const removeProject = async (projectId: string) => {
    setLoading(true);
    try {
      await deleteProject(projectId);
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

  return { addProject, fetchProjects, editProject, removeProject, loading, error };
};
