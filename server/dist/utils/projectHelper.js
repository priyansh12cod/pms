"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProjectFields = void 0;
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
const validateProjectFields = (project) => {
    const { projectName, gitHubRepoLink, thumbnail } = project;
    if (!projectName || !gitHubRepoLink || !thumbnail) {
        throw new ErrorHandler_1.default('Project name, GitHub repository link, and thumbnail are required', 400);
    }
};
exports.validateProjectFields = validateProjectFields;
