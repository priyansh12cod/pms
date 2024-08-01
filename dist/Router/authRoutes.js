"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
// Register User
router.post('/register', auth_controller_1.registerUser);
// Activate User
router.get('/activate/:activationToken', auth_controller_1.activateUser);
// Login User
router.post('/login', auth_controller_1.loginUser);
// Logout User
router.get('/logout', auth_controller_1.logoutUser);
// Update Access Token
router.get('/refresh', auth_controller_1.updateAccessToken);
exports.default = router;
