import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

export const validateProject = (req: Request, res: Response, next: NextFunction) => {
  const { projectName, gitHubRepoLink, thumbnail } = req.body;

  if (!projectName || !gitHubRepoLink || !thumbnail) {
    return next(new ErrorHandler('Project name, GitHub repository link, and thumbnail are required', 400));
  }

  next();
};
