import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from './Router/adminRoutes';
import authRoutes from './Router/authRoutes';
import projectRoutes from './Router/projectRoutes';
import userRoutes from './Router/userRoutes';
import { ErrorMiddleware } from './middleware/error';
import { isAuthenticated } from './middleware/auth';


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Routes
app.use('/api/admin', isAuthenticated, adminRoutes);
app.use('/api/auth', authRoutes);  // No isAuthenticated here, as it’s used for login and registration
app.use('/api/projects', isAuthenticated, projectRoutes);
app.use('/api/user', isAuthenticated, userRoutes);

// Error middleware
app.use(ErrorMiddleware);

export default app;
