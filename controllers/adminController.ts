import { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import User from '../models/user';

// Get all users
export const getAllUsers = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});

// Get user by ID
export const getUserById = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update user role
export const updateUserRole = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['Student', 'Admin'].includes(role)) {
        return next(new ErrorHandler('Invalid role', 400));
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Delete user
export const deleteUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
});
