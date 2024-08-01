"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProject = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const validateProject = (req, res, next) => {
    const { projectName, gitHubRepoLink, thumbnail } = req.body;
    if (!projectName || !gitHubRepoLink || !thumbnail) {
        return next(new ErrorHandler_1.default('Project name, GitHub repository link, and thumbnail are required', 400));
    }
    next();
};
exports.validateProject = validateProject;
