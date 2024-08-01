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
exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.registerUser = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const user_1 = __importDefault(require("../models/user"));
const emailSender_1 = __importDefault(require("../utils/emailSender"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const generateToken_1 = require("../utils/generateToken");
exports.registerUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword, userType, captcha } = req.body;
    // Log the CAPTCHA response for debugging
    console.log('CAPTCHA Response:', captcha);
    // Validate email domain
    if (!email.endsWith("@lnmiit.ac.in")) {
        return next(new ErrorHandler_1.default("Invalid email domain", 400));
    }
    // Validate passwords
    if (password !== confirmPassword) {
        return next(new ErrorHandler_1.default("Passwords do not match", 400));
    }
    // Validate CAPTCHA
    if (!captcha) {
        return next(new ErrorHandler_1.default("CAPTCHA verification failed", 400));
    }
    // Verify CAPTCHA token
    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            return next(new ErrorHandler_1.default("CAPTCHA secret key not set", 500));
        }
        const response = yield axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: secretKey,
                response: captcha
            }
        });
        console.log('ReCAPTCHA Verification Response:', response.data); // For debugging
        if (!response.data.success) {
            return next(new ErrorHandler_1.default("CAPTCHA verification failed", 400));
        }
    }
    catch (error) {
        console.error('CAPTCHA Verification Error:', error); // For debugging
        return next(new ErrorHandler_1.default("CAPTCHA verification failed", 400));
    }
    // Check if user already exists
    const existingUser = yield user_1.default.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler_1.default("User already exists", 400));
    }
    // Hash password and create user
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const user = yield user_1.default.create({ name, email, password: hashedPassword, userType });
    // Create and send activation token
    const activationToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "1h" });
    const activationUrl = `${process.env.CLIENT_URL}/activate/${activationToken}`;
    yield (0, emailSender_1.default)({
        email: user.email,
        subject: "Activate Your Account",
        template: "verifyEmail.ejs",
        data: { name: user.name, activationUrl }
    });
    res.status(201).json({
        success: true,
        message: "Registration successful! Please check your email to activate your account."
    });
}));
// Activate user
exports.activateUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { activationToken } = req.params;
    try {
        const decoded = jsonwebtoken_1.default.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET);
        yield user_1.default.findByIdAndUpdate(decoded.id, { isActive: true });
        res.status(200).json({
            success: true,
            message: "Account activated successfully! You can now log in.",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Invalid or expired activation token", 400));
    }
}));
// Login user
exports.loginUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        return next(new ErrorHandler_1.default("Invalid email or password", 401));
    }
    if (!user.isActive) {
        return next(new ErrorHandler_1.default("Account is not activated", 403));
    }
    (0, generateToken_1.sendToken)(user, 200, res);
}));
// Logout user
exports.logoutUser = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
}));
// Update access token
exports.updateAccessToken = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
        return next(new ErrorHandler_1.default("No refresh token found", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
        const user = yield user_1.default.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        (0, generateToken_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Invalid refresh token", 401));
    }
}));
