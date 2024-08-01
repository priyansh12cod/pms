import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

// Connect to MongoDB
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);  // Use DB_URL for MongoDB connection
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
        process.exit(1);
    }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
        process.exit(1);
    }
};

startServer();
