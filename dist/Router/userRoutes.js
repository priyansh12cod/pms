"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get user profile
router.get('/profile', auth_1.isAuthenticated, userController_1.getUserProfile);
// Update user profile
router.put('/profile', auth_1.isAuthenticated, userController_1.updateUserProfile);
// Change password
router.put('/password', auth_1.isAuthenticated, userController_1.changePassword);
exports.default = router;
