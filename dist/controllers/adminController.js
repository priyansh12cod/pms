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
exports.deleteUser = exports.updateUserRole = exports.getUserById = exports.getAllUsers = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const user_1 = __importDefault(require("../models/user"));
// Get all users
exports.getAllUsers = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    res.status(200).json({
        success: true,
        users,
    });
}));
// Get user by ID
exports.getUserById = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield user_1.default.findById(userId);
    if (!user) {
        return next(new ErrorHandler_1.default('User not found', 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
}));
// Update user role
exports.updateUserRole = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    if (!['Student', 'Admin'].includes(role)) {
        return next(new ErrorHandler_1.default('Invalid role', 400));
    }
    const user = yield user_1.default.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
        return next(new ErrorHandler_1.default('User not found', 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
}));
// Delete user
exports.deleteUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    yield user_1.default.findByIdAndDelete(userId);
    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
}));
