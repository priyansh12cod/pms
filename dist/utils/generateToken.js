"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.generateRefreshToken = exports.generateAccessToken = exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.accessTokenOptions = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
};
exports.refreshTokenOptions = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
};
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, exports.accessTokenOptions);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, exports.refreshTokenOptions);
};
exports.generateRefreshToken = generateRefreshToken;
const sendToken = (user, statusCode, res, sessionId) => {
    const accessToken = (0, exports.generateAccessToken)(user);
    const refreshToken = (0, exports.generateRefreshToken)(user);
    res.status(statusCode).json({
        success: true,
        accessToken,
        refreshToken,
        sessionId,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};
exports.sendToken = sendToken;
