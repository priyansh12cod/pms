import { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import Project from '../models/project';
import User, { IUser } from '../models/user';

// Create a new project
export const createProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new ErrorHandler('User not authenticated', 401));
    }

    const { title, description, deadline } = req.body;
    const userId = (req.user as IUser)._id;

    const project = await Project.create({ title, description, deadline, userId });

    res.status(201).json({
        success: true,
        project,
    });
});

// Get all projects
export const getAllProjects = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const projects = await Project.find();
    res.status(200).json({
        success: true,
        projects,
    });
});

// Update project
export const updateProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const { title, description, deadline } = req.body;

    const project = await Project.findByIdAndUpdate(projectId, { title, description, deadline }, { new: true });

    if (!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    res.status(200).json({
        success: true,
        project,
    });
});

// Delete project
export const deleteProject = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
    });
});
