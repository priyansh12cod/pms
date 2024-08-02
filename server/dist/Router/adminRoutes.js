"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all users
router.get('/users', auth_1.isAuthenticated, (0, auth_1.authorizeRoles)('Admin'), adminController_1.getAllUsers);
// Get user by ID
router.get('/user/:id', auth_1.isAuthenticated, (0, auth_1.authorizeRoles)('Admin'), adminController_1.getUserById);
// Update user role
router.put('/user/:id/role', auth_1.isAuthenticated, (0, auth_1.authorizeRoles)('Admin'), adminController_1.updateUserRole);
// Delete user
router.delete('/user/:id', auth_1.isAuthenticated, (0, auth_1.authorizeRoles)('Admin'), adminController_1.deleteUser);
exports.default = router;
