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
exports.authorizeRoles = exports.isAdmin = exports.isAuthenticated = void 0;
const catchAsyncError_1 = require("./catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Add this import
exports.isAuthenticated = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return next(new ErrorHandler_1.default("Please login to access this resource", 401)); // Changed status code to 401 (Unauthorized)
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return next(new ErrorHandler_1.default("Access token is not valid", 401)); // Changed status code to 401 (Unauthorized)
        }
        const user = yield user_1.default.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404)); // Changed status code to 404 (Not Found)
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Invalid token", 401)); // Changed status code to 401 (Unauthorized)
    }
}));
exports.isAdmin = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return next(new ErrorHandler_1.default("User not found", 404)); // Changed status code to 404 (Not Found)
    }
    if (user.role !== 'Admin') {
        return next(new ErrorHandler_1.default("Access denied. Admins only", 403)); // Changed status code to 403 (Forbidden)
    }
    next();
}));
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        var _a, _b;
        if (!roles.includes(((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || "")) {
            return next(new ErrorHandler_1.default(`Role: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.role} is not allowed to access this resource`, 403)); // Changed status code to 403 (Forbidden)
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
