import { IProject } from '../models/project';
import ErrorHandler from './ErrorHandler';

export const validateProjectFields = (project: IProject) => {
  const { projectName, gitHubRepoLink, thumbnail } = project;

  if (!projectName || !gitHubRepoLink || !thumbnail) {
    throw new ErrorHandler('Project name, GitHub repository link, and thumbnail are required', 400);
  }
};
