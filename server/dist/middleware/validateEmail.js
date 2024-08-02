"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const validateEmail = (req, res, next) => {
    const email = req.body.email;
    if (!email.endsWith('@lnmiit.ac.in')) {
        return next(new ErrorHandler_1.default('Only institute emails ending with @lnmiit.ac.in are acceptable', 400));
    }
    next();
};
exports.validateEmail = validateEmail;
