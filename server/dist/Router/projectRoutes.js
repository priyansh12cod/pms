"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Create a new project
router.post('/project', auth_1.isAuthenticated, projectController_1.createProject);
// Get all projects
router.get('/projects', auth_1.isAuthenticated, projectController_1.getAllProjects);
// Update project
router.put('/project/:id', auth_1.isAuthenticated, projectController_1.updateProject);
// Delete project
router.delete('/project/:id', auth_1.isAuthenticated, (0, auth_1.authorizeRoles)('Admin'), projectController_1.deleteProject);
exports.default = router;
