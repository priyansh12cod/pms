"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const adminRoutes_1 = __importDefault(require("./Router/adminRoutes"));
const authRoutes_1 = __importDefault(require("./Router/authRoutes"));
const projectRoutes_1 = __importDefault(require("./Router/projectRoutes"));
const userRoutes_1 = __importDefault(require("./Router/userRoutes"));
const error_1 = require("./middleware/error");
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// Routes
app.use('/api/admin', auth_1.isAuthenticated, adminRoutes_1.default);
app.use('/api/auth', authRoutes_1.default); // No isAuthenticated here, as it’s used for login and registration
app.use('/api/projects', auth_1.isAuthenticated, projectRoutes_1.default);
app.use('/api/user', auth_1.isAuthenticated, userRoutes_1.default);
// Error middleware
app.use(error_1.ErrorMiddleware);
exports.default = app;
