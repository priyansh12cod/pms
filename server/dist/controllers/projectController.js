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
exports.deleteProject = exports.updateProject = exports.getAllProjects = exports.createProject = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const project_1 = __importDefault(require("../models/project"));
// Create a new project
exports.createProject = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new ErrorHandler_1.default('User not authenticated', 401));
    }
    const { title, description, deadline } = req.body;
    const userId = req.user._id;
    const project = yield project_1.default.create({ title, description, deadline, userId });
    res.status(201).json({
        success: true,
        project,
    });
}));
// Get all projects
exports.getAllProjects = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.default.find();
    res.status(200).json({
        success: true,
        projects,
    });
}));
// Update project
exports.updateProject = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const { title, description, deadline } = req.body;
    const project = yield project_1.default.findByIdAndUpdate(projectId, { title, description, deadline }, { new: true });
    if (!project) {
        return next(new ErrorHandler_1.default('Project not found', 404));
    }
    res.status(200).json({
        success: true,
        project,
    });
}));
// Delete project
exports.deleteProject = (0, catchAsyncError_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    yield project_1.default.findByIdAndDelete(projectId);
    res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
    });
}));
