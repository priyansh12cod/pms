import { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import { IUser } from '../models/user';
import User from '../models/user';
import bcrypt from 'bcrypt';

// Get user profile
export const getUserProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    const fetchedUser = await User.findById(user._id);
    if (!fetchedUser) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        user: fetchedUser,
    });
});

// Update user profile
export const updateUserProfile = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const { name, email, avatar } = req.body;

    if (email && !email.endsWith('@lnmiit.ac.in')) {
        return next(new ErrorHandler('Invalid email domain', 400));
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, { name, email, avatar }, { new: true });

    if (!updatedUser) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        user: updatedUser,
    });
});

// Change user password
export const changePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const { oldPassword, newPassword } = req.body;

    const fetchedUser = await User.findById(user._id).select('+password');
    if (!fetchedUser) {
        return next(new ErrorHandler('User not found', 404));
    }

    const isMatch = await bcrypt.compare(oldPassword, fetchedUser.password);
    if (!isMatch) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    fetchedUser.password = hashedNewPassword;

    await fetchedUser.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
});
