"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateUserProfile = exports.getUserProfile = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Get user profile
exports.getUserProfile = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const fetchedUser = yield user_1.default.findById(user._id);
    if (!fetchedUser) {
        return next(new ErrorHandler_1.default('User not found', 404));
    }
    res.status(200).json({
        success: true,
        user: fetchedUser,
    });
}));
// Update user profile
exports.updateUserProfile = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { name, email, avatar } = req.body;
    if (email && !email.endsWith('@lnmiit.ac.in')) {
        return next(new ErrorHandler_1.default('Invalid email domain', 400));
    }
    const updatedUser = yield user_1.default.findByIdAndUpdate(user._id, { name, email, avatar }, { new: true });
    if (!updatedUser) {
        return next(new ErrorHandler_1.default('User not found', 404));
    }
    res.status(200).json({
        success: true,
        user: updatedUser,
    });
}));
// Change user password
exports.changePassword = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const fetchedUser = yield user_1.default.findById(user._id).select('+password');
    if (!fetchedUser) {
        return next(new ErrorHandler_1.default('User not found', 404));
    }
    const isMatch = yield bcrypt_1.default.compare(oldPassword, fetchedUser.password);
    if (!isMatch) {
        return next(new ErrorHandler_1.default('Old password is incorrect', 400));
    }
    const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 12);
    fetchedUser.password = hashedNewPassword;
    yield fetchedUser.save();
    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
}));
